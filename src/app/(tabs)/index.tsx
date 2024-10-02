import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { DateBirth, ZeroLeft } from '../../utils/functions';
import { INiverProps } from '../../utils/interface'
import * as Linking from 'expo-linking';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { styles } from '../../style/styles'
import Header from '../../component/header';
import { supabase } from '../../database';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const { getItem } = useAsyncStorage('@notifybirth:contacts')
  const [niverToday, setNiverToday] = useState<INiverProps[]>([])
  const [listBirthMonth, setListBirthMonth] = useState<INiverProps[]>([])

  async function NextDateBirth(month: string) {
    const dataContacts = await supabase.from('contacts').select('*')
    if (dataContacts.data) {
      let newArray = dataContacts.data.filter(element => element.datanas.includes(`/${month}`))
      let dataComplete: INiverProps[] = []
      newArray.map(niver => {
        if (DateBirth(niver.datanas)) {
          const data = {
            id: niver.id,
            grupo: niver.grupo,
            nome: niver.nome,
            datanas: niver.datanas,
            telefone: niver.telefone
          }
          dataComplete = [...dataComplete, data]
        }
      })
      setNiverToday(dataComplete)
    }
    // const response = await getItem()
    // const data:INiverProps[] = response ? JSON.parse(response) : []
    // let newArray = data.filter(element => element.datanas.includes(`/${month}`))
    // setListBirthMonth(newArray)
    // let dataComplete: INiverProps[] = []
    // data.map(niver => {
    //   if (DateBirth(niver.datanas)) {
    //     const data = {
    //       id: niver.id,
    //       grupo: niver.grupo,
    //       nome: niver.nome,
    //       datanas: niver.datanas,
    //       telefone: niver.telefone
    //     }
    //     dataComplete = [...dataComplete, data]
    //   }
    // })
    // handleCallNotification("Hoje tem aniversariante!")
    // setNiverToday(dataComplete)
  }

  function SendWhatsApp(phoneNumber: string) {
    Linking.openURL(`https://wa.me/55${phoneNumber}`); 
  }

  const handleCallNotification = async (message: string) => await Notifications.scheduleNotificationAsync({
    content: {
      title: 'BirthDay',
      body: message,
    },
    trigger: null,
  });

  useFocusEffect(useCallback(() => {
    const actualMonth = new Date().getMonth() + 1
    const strActualMonth = ZeroLeft(actualMonth.toString(), 2)
    NextDateBirth(strActualMonth)
    if (niverToday.length > 0) {
      handleCallNotification("Hoje tem aniversariante!")
    }
  }, []))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
            
      <View style={styles.container}>
          {
            niverToday.length > 0 ? 
            <View>
              <Text style={styles.titleInformation}><MaterialIcons name='cake' size={22} color="#FF9900" /> Hoje tem aniversário !!!</Text>
              {
                niverToday.map(niver => (
                  <View style={styles.listMessage} key={niver.id}>
                    <Text style={styles.textMessage}>{niver.nome}</Text>
                    <TouchableOpacity style={styles.btnMessage}>
                      <FontAwesome onPress={() => SendWhatsApp(niver.telefone)} name='whatsapp' size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View> 
                ))
              }
            </View>
          : 
          <View>
            <Text style={styles.titleInformation}>Não há aniversariantes hoje.</Text>
            {listBirthMonth.length > 0 ? 
              <Text style={styles.titleInformation}>Estes são os aniversariantes do mês:</Text>
              : 
              <Text style={styles.titleInformation}>Você pode navegar pela lista completa de aniversariantes no rodapé do aplicativo.</Text>
            }
            <FlatList 
              data={listBirthMonth}
              keyExtractor={item => item.nome}
              renderItem={item => (
                <View style={styles.listContainer}>
                  <Text style={styles.itemListTree}>{item.item.datanas}</Text>
                  <Text style={styles.itemListOne}>{item.item.nome} ({item.item.grupo})</Text>
                </View>
              )}
            />
          </View>
          }
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}


