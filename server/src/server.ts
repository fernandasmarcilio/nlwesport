import express from "express"
import cors from "cors"

import { PrismaClient } from "@prisma/client"
import { convertHourStringToMinute } from "./utils/convert-hour-string-to-minutes";
import { convertMinuteToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient();

/**
 * Query - persistencia de estado (paginação)
 * Route - identificação de um recurso
 * Body - enviar informações (formulário)
 */ 


app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: { 
        select: {
          ads: true,
        }
      }
    }
  })

  return res.json(games);
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  // validação -> zod js

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinute(body.hourStart),
      hourEnd: convertHourStringToMinute(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({ 
    select: {
      id: true,
      name: true,            
      yearsPlaying: true,          
      weekDays: true,        
      hourStart: true,       
      hourEnd: true,         
      useVoiceChannel: true, 
    },
    where: { 
      gameId
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  const formattedAds = ads.map( ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinuteToHourString(ad.hourStart),
      hourEnd: convertMinuteToHourString(ad.hourEnd)
    }
  })

  return res.json(formattedAds);
});

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return res.json({ discord: ad.discord });
});

app.listen(3333);