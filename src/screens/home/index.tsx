import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Text, View, SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { DateBirth, ZeroLeft } from '../../utils/functions';
import { aniversariantes } from '../../utils/database'
import { INiverProps } from '../../utils/interface'
import * as Linking from 'expo-linking';

import { styles } from './styles'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const [niverToday, setNiverToday] = useState<INiverProps>()
  const [listBirthMonth, setListBirthMonth] = useState<INiverProps[]>([])

  function NextDateBirth(month: string) {
    const myArray = aniversariantes
    let newArray = myArray.filter(element => element.datanas.includes(`/${month}`))
    setListBirthMonth(newArray)
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

  useEffect(() => {
    aniversariantes.map(niver => {
      if (DateBirth(niver.datanas)) {
        setNiverToday(niver)
        handleCallNotification(niver)
      }
    })
    const actualMonth = new Date().getMonth() + 1
    const strActualMonth = ZeroLeft(actualMonth.toString(), 2)
    NextDateBirth(strActualMonth)
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
                  <Text style={styles.itemListOne}>{item.item.nome} ({item.item.equipe})</Text>
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


