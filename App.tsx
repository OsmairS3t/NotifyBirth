import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View  } from 'react-native';
import * as Notifications from 'expo-notifications';
import { DateBirth } from './src/utils/functions';
import { aniversariantes } from './src/utils/database'
import { INiverProps } from './src/utils/interface'
import * as Linking from 'expo-linking';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [niverToday, setNiverToday] = useState<INiverProps>()

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
  },[])

  return (
    <View style={styles.container}>
      <Text>Notify BirthDay</Text>
        {
          niverToday ? 
          <View>
            <Text>Hoje é aniversário de {niverToday.nome}</Text> 
            <Button title='Enviar Mensagem Whatsapp' onPress={() => SendWhatsApp(niverToday.telefone)} />
          </View>
        :
        <Text></Text>
        }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
