import { View, ActivityIndicator } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface LoadingProps {
  color?: 'primary' | 'secondary';
}

export function Loading({ color = 'primary' }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        color={color === 'primary' ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT}
        size="large"
      />
    </View>
  );
}