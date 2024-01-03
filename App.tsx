import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Platform  } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // async function handleCallNotification() {
  //   const {status} = await Notifications.getPermissionsAsync();
  //   if (status !== 'granted'){
  //     alert('Você não tem permissão para receber notificações.')
  //     return;
  //   }
  //   let token = (await Notifications.getExpoPushTokenAsync()).data
  //   console.log(token)
  // }

 const handleCallNotification = () => Notifications.scheduleNotificationAsync({
    content: {
      title: 'BirthDay',
      body: "Today is my Day!",
    },
    trigger: null,
  });

  return (
    <View style={styles.container}>
      <Text>Notify BirthDay</Text>
      <Button title='Notify Me' onPress={handleCallNotification} />
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
