import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { AdsCard, AdsProps } from '../../components/AdsCard';

import { THEME } from '../../theme';
import { styles } from './styles';
import logoImage from "../../assets/logo-nlw-esports.png";

import { API_URL } from '../../../const';

export function Game({}) {
  const [ ads, setAds ] = useState<AdsProps[]>([]);
  
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`${API_URL}/games/${game.id}/ads`)
    .then((response) => response.json())
    .then((data) => {
      setAds(data);
    });
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={30}
            />
          </TouchableOpacity>

          <Image 
            source={logoImage}
            style={styles.logo}
            resizeMode="cover"
          />

          <View style={styles.right} />
        </View>

        <Image 
          source={{uri: game.bannerUrl}}
          style={styles.cover}
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />
        
        <FlatList 
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AdsCard data={item} onConnect={() => {}} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.containerList}
          contentContainerStyle={ads.length ? styles.contentList : styles.emptyContentList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />


      </SafeAreaView>
    </Background>
  );
}