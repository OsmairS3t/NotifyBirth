import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../component/header';
import { Feather } from '@expo/vector-icons'

import { styles } from '../../style/styles';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { INiverProps } from '../../utils/interface';
import { useFocusEffect } from 'expo-router/src/useFocusEffect';

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
              <Text style={styles.itemListOne}>{item.item.nome} ({item.item.grupo})</Text>
              <Text style={styles.itemListTwo}>{item.item.datanas}</Text>
              <TouchableOpacity
                style={styles.itemListTree}
                onPress={() => {removeContact(item.item.id)}}
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
