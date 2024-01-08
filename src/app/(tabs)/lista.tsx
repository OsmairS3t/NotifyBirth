import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Header from '../../component/header';
import { Feather } from '@expo/vector-icons'

import { styles } from '../../style/styles';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { INiverProps } from '../../utils/interface';
import { useFocusEffect } from 'expo-router/src/useFocusEffect';
import { Link } from 'expo-router';

export default function Lista() {
  const { getItem, setItem } = useAsyncStorage('@notifybirth:contacts')
  const [contacts, setContacts] = useState<INiverProps[]>([])

  async function readData() {
    try {
      const response = await getItem()
      const data = response ? JSON.parse(response) : []
      setContacts(data)
    } catch (error) {
      console.log(error)      
    }
  }

  function remove(id: string) {
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir?',  
      [
        {text: 'Sim', onPress: () => removeContact(id) },
        {text: 'Não', onPress: () => {}, style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  async function removeContact(id: string) {
    const response = await getItem()
    const previousData = response ? JSON.parse(response) : []
    const data = previousData.filter((item: INiverProps) => item.id !== id)
    await setItem(JSON.stringify(data))
    setContacts(data)
  }

  useFocusEffect(useCallback(() => {
    readData()
  }, []))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      
      <View style={styles.containerTab}>
        <Text style={styles.titleInformation}>Listagem:</Text>
        <FlatList 
          data={contacts}
          renderItem={item => (
            <View style={styles.itemList}>
              <Link href={"/contact/" + item.item.id} asChild>
                <Text style={styles.itemListOne}>{item.item.nome} ({item.item.grupo})</Text>
              </Link>
                <Text style={styles.itemListTwo}>{item.item.datanas}</Text>
              <TouchableOpacity
                style={styles.itemListTree}
                onPress={() => {remove(item.item.id)}}
              >
                <Feather name='trash-2' size={24} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
