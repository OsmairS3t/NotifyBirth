import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Header from '../../component/header';
import { Feather } from '@expo/vector-icons'
import { styles } from '../../style/styles';
import { INiverProps } from '../../utils/interface';
import { useFocusEffect } from 'expo-router';
import { Link } from 'expo-router';
import { supabase } from '../../database';

export default function Lista() {
  const [contacts, setContacts] = useState<INiverProps[]>([])

  async function readData() {
    try {
      const { data } = await supabase.from('contacts').select('*').order('nome')
      if (data) {
        setContacts(data)
      }
    } catch (error) {
      console.log(error)      
    }
  }

  function remove(item: INiverProps) {
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir o cadastro de '+ item.nome + ' ?',
      [
        {text: 'Sim', onPress: () => removeContact(Number(item.id)) },
        {text: 'Não', onPress: () => {}, style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  async function removeContact(id: number) {
    await supabase.from('contacts').delete().eq('id', id)
    readData()
  }

  useFocusEffect(useCallback(() => {
    readData()
  }, []))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      
      <View style={styles.containerTab}>
        {
        contacts.length === 0 ?
        <Text style={styles.titleInformation}>Não há contatos cadastrados, para cadastrar vá ao rodapé e entre no novo cadastro.</Text>
        :
        <>
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
                  onPress={() => {remove(item.item)}}
                >
                  <Feather name='trash-2' size={24} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
        }
      </View>
    </SafeAreaView>
  )
}
