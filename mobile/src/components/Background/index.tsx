import { ImageBackground } from 'react-native';
import { styles } from './styles';

import backgroundImage from '../../assets/background-galaxy.png';

interface BackgroundProps {
  children: React.ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground 
      style={styles.container}
      source={backgroundImage}
      defaultSource={backgroundImage}
    >
      { children }
    </ImageBackground>
  );
}