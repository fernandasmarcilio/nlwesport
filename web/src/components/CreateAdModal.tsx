import { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { GameController, Check } from "phosphor-react";
import { Input } from "./Input";
import { api } from "../lib/api";

interface CreateAdModalProps {
  children: React.ReactNode;
}

interface Games {
  id: string;
  title: string;
}

const days = [
  { value: "0", name: "Domingo", label: "D" },
  { value: "1", name: "Segunda", label: "S" },
  { value: "2", name: "Terça", label: "T" },
  { value: "3", name: "Quarta", label: "Q" },
  { value: "4", name: "Quinta", label: "Q" },
  { value: "5", name: "Sexta", label: "S" },
  { value: "6", name: "Sabado", label: "S" },
];

// @TODO responsividade
// @TODO Trocar select por radix-ui select
// @TODO Carrossel (keen-slider.io)
// @TODO Validação (reack-hook-form)
// @TODO Autenticação (Entrar com discord)

export function CreateAdModal({ children }: CreateAdModalProps) {
  const [games, setGames] = useState<Games[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    api.get("/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const { game, name, discord, yearsPlaying, hourStart, hourEnd } = data;

    //validação -> atualizar a estilização de erro nos campos
    if(!game || !name || !discord || !yearsPlaying || !hourStart || !hourEnd || weekDays.length === 0 ) {
      console.log('Campo não preenchido');  
      return;
    }

    try {
      await api.post(`/games/${game}/ads`, {
        name,
        discord,
        yearsPlaying: Number(yearsPlaying),
        hourStart,
        hourEnd,
        weekDays: weekDays.map(Number),
        useVoiceChannel,
      });

      alert('Anúncio criado com sucesso')
    } catch (error) {
      alert('Erro ao criar anúncio')
      console.log(error);
    }
  }

  function handleCheck(checked: Checkbox.CheckedState) {
    checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
  }

  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed">
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={handleCreateAd}
            >
              <div className="input-field">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <select
                  id="game"
                  name="game"
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                  defaultValue="default"
                >
                  <option disabled selected value="default">
                    Selecione o game que deseja jogar
                  </option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Como te chamam dentro do game?"
                />
              </div>

              <div className="input-field-col-2">
                <div className="input-field">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    type="number"
                    id="yearsPlaying"
                    name="yearsPlaying"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input
                    id="discord"
                    name="discord"
                    placeholder="Usuario#0000"
                  />
                </div>
              </div>

              <div className="input-field-col-2">
                <div className="input-field">
                  <label htmlFor="weekDays">Quanto costuma jogar?</label>

                  <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-4"
                    onValueChange={setWeekDays}
                    value={weekDays}
                  >
                    {days.map((day) => (
                      <ToggleGroup.Item
                        key={day.value}
                        value={day.value}
                        title={day.name}
                        className={`w-8 h-8 rounded hover:bg-violet-500 transition-all ${
                          weekDays.includes(day.value)
                            ? "bg-violet-500"
                            : "bg-zinc-900"
                        }`}
                      >
                        {day.label}
                      </ToggleGroup.Item>
                    ))}
                  </ToggleGroup.Root>
                </div>

                <div className="input-field flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="input-field-col-2 gap-2">
                    <Input
                      type="time"
                      id="hourStart"
                      name="hourStart"
                      placeholder="De"
                    />
                    <Input
                      type="time"
                      id="hourEnd"
                      name="hourEnd"
                      placeholder="Até"
                    />
                  </div>
                </div>
              </div>

              <label className="mt-2 flex item-center gap-2 text-sm">
                <Checkbox.Root
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => handleCheck(checked)}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-all"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-all"
                >
                  <GameController size={24} />
                  Encotrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
