import { useState } from "react";
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';

import { Heading } from "../Heading";

import { THEME } from "../../theme";
import { styles } from "./styles";
import { Loading } from "../Loading";

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState(false);
  
  async function handleCopyDuoDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert("Discord copiado!", "Usuário copiado para você adicionar no Discord");
    setIsCopping(false);
  }

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.overlay}>
        <View style={styles.container}>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500}/>
          </TouchableOpacity>

          <MaterialIcons name="check-circle-outline" size={64} color={THEME.COLORS.SUCCESS} />
          <Heading title="Let's play!" subtitle="Agora é só começar a jogar!" style={styles.heading} />
          <Text style={styles.label}>Adicione no discord</Text>
          <TouchableOpacity style={styles.discordButton} onPress={handleCopyDuoDiscordToClipboard} disabled={isCopping}>
              <Text style={styles.discord}>{isCopping ? (<Loading />) : discord}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}
