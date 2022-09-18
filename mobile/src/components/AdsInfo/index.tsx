import { View, Text, ColorValue } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface AdsInfoProp {
  label: string;
  value: string;
  color?: ColorValue;
}

export function AdsInfo({ label, value, color = THEME.COLORS.TEXT }: AdsInfoProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, {color}]} numberOfLines={1}>{value}</Text>
    </View>
  );
}