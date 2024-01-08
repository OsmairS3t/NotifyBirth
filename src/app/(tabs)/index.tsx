import { useCallback, useState } from 'react';
import { Button, FlatList, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router/src/useFocusEffect';
import * as Notifications from 'expo-notifications';
import { DateBirth, ZeroLeft } from '../../utils/functions';
import { INiverProps } from '../../utils/interface'
import * as Linking from 'expo-linking';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { styles } from '../../style/styles'
import Header from '../../component/header';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const { getItem } = useAsyncStorage('@notifybirth:contacts')
  const [niverToday, setNiverToday] = useState<INiverProps>()
  const [listBirthMonth, setListBirthMonth] = useState<INiverProps[]>([])

  async function NextDateBirth(month: string) {
    const response = await getItem()
    const data:INiverProps[] = response ? JSON.parse(response) : []
    let newArray = data.filter(element => element.datanas.includes(`/${month}`))
    setListBirthMonth(newArray)

    data.map(niver => {
      if (DateBirth(niver.datanas)) {
        setNiverToday(niver)
        handleCallNotification(niver)
      }
    })
  }

  function SendWhatsApp(phoneNumber: string) {
    Linking.openURL(`https://wa.me/55${phoneNumber}`); 
  }

  const handleCallNotification = (niver: INiverProps) => Notifications.scheduleNotificationAsync({
    content: {
      title: 'BirthDay',
      body: `Hoje (${niver.datanas}) é Aniversário de ${niver.nome}.`,
    },
    trigger: null,
  });

  useFocusEffect(useCallback(() => {
    const actualMonth = new Date().getMonth() + 1
    const strActualMonth = ZeroLeft(actualMonth.toString(), 2)
    NextDateBirth(strActualMonth)
  }, []))


  // useEffect(() => {
  //   niverList.map(niver => {
  //     if (DateBirth(niver.datanas)) {
  //       setNiverToday(niver)
  //       handleCallNotification(niver)
  //     }
  //   })
  //   const actualMonth = new Date().getMonth() + 1
  //   const strActualMonth = ZeroLeft(actualMonth.toString(), 2)
  //   NextDateBirth(strActualMonth)
  // },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
            
      <View style={styles.container}>
          {
            niverToday ? 
            <View>
              <Text style={styles.titleInformation}>Hoje é aniversário de {niverToday.nome}</Text> 
              <Button title='Enviar Mensagem Whatsapp' onPress={() => SendWhatsApp(niverToday.telefone)} />
            </View>
          : 
          <View>
            <Text style={styles.titleInformation}>Não há aniversariantes hoje, mas você pode navegar pelos próximos:</Text>
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


