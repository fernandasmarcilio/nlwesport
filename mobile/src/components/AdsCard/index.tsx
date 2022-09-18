import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import { THEME } from "../../theme";
import { AdsInfo } from "../AdsInfo";

import { styles } from "./styles";

export interface AdsProps {
  hourEnd: string;
  hourStart: string; 
  id: string;
  name: string; 
  useVoiceChannel: boolean; 
  weekDays: string[];
  yearsPlaying: number;
}

interface AdsCardProps {
  data: AdsProps;
  onConnect: () => void;
}

export function AdsCard({ data, onConnect }: AdsCardProps) {
  return (
    <View style={styles.container}>
      <AdsInfo label="Nome" value={data.name} />
      <AdsInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <AdsInfo label="Disponibilidade" value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
      <AdsInfo 
        label="Chamada de áudio?" 
        value={data.useVoiceChannel ? 'Sim' : 'Não'} 
        color={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} 
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <Ionicons name="game-controller-outline" size={20} color={THEME.COLORS.TEXT} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
