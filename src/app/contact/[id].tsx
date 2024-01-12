import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useGlobalSearchParams } from "expo-router";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { TextInputMask } from 'react-native-masked-text';

import { INiverProps } from "../../utils/interface";
import Header from "../../component/header";

import { stylesLocal } from './styles';
import { styles } from '../../style/styles'
import Toast from "react-native-toast-message";

export default function Update() {
  const { getItem, setItem } = useAsyncStorage('@notifybirth:contacts')
  const [contacts, setContacts] = useState<INiverProps[]>([])
  const [contact, setContact] = useState<INiverProps>()
  const [dataNas, setDataNas] = useState('')
  const [telefone, setTelefone] = useState('')
  const { id } = useGlobalSearchParams();

  async function loadContact(id: string) {
    const response = await getItem()
    const data:INiverProps[] = response ? JSON.parse(response) : []
    setContacts(data)
    const dataFound = data.find(d => d.id === id)
    setTelefone(String(dataFound?.telefone))
    setDataNas(String(dataFound?.datanas))
    setContact(dataFound)
  }

  async function handleSave() {
    const dataUpdate = {
      id: contact?.id,
      grupo: contact?.grupo,
      nome: contact?.nome,
      datanas: dataNas,
      telefone: telefone,
    }
    const data = contacts.filter(cont => cont.id !== id)
    const updateContacts = [...data, dataUpdate]
    await setItem(JSON.stringify(updateContacts))
    Alert.alert("Dados atualizados com sucesso!")
  }

  useEffect(() => {
    loadContact(String(id))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <View style={styles.containerTab}>
        <View style={stylesLocal.titleBack}> 
          <Link href="/lista">
            <Feather name="arrow-left" size={22} />
          </Link>
          <Text style={stylesLocal.titleText}>Cadastro do Aniversariante:</Text>
        </View>

        <View style={stylesLocal.cadastro}>
          <View style={stylesLocal.groupItem}>
            <Text style={stylesLocal.itemTitleCadastro}>Grupo:</Text>
            <Text style={stylesLocal.itemCadastro}>{contact?.grupo}</Text>
          </View>
          <View style={stylesLocal.groupItem}>
            <Text style={stylesLocal.itemTitleCadastro}>Nome:</Text>
            <Text style={stylesLocal.itemCadastro}>{contact?.nome}</Text>
          </View>
          <View style={stylesLocal.groupItem}>
            <Text style={stylesLocal.itemTitleCadastro}>Aniversário:</Text>
            <TextInputMask
              type="datetime" 
              options={{
                maskType: 'BRL',
                format: 'dd/mm',
              }}
              keyboardType="phone-pad"
              style={stylesLocal.input}
              onChangeText={value => setDataNas(value)}
              value={dataNas}
            />
          </View>
          <View style={stylesLocal.groupItem}>
            <Text style={stylesLocal.itemTitleCadastro}>Telefone:</Text>
            <TextInputMask 
                type='cel-phone'
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '99 '
                }}
              keyboardType="phone-pad"
              style={stylesLocal.input}
              onChangeText={value => setTelefone(value)}
              value={telefone}
            />
          </View>
          <TouchableOpacity style={stylesLocal.btnSave} onPress={handleSave}>
            <Feather name="save" size={22} color="#ffffff" />
            <Text style={stylesLocal.textBtn}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
