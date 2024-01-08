import { Link, useGlobalSearchParams } from "expo-router";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import { stylesLocal } from './styles';
import { styles } from '../../style/styles'

import { useEffect, useState } from "react";
import { INiverProps } from "../../utils/interface";
import Header from "../../component/header";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  grupo: z.string(),
  nome: z.string(),
  datanas: z.string(),
  telefone: z.string()
})

export default function Update() {
  const { getItem } = useAsyncStorage('@notifybirth:contacts')
  const [contact, setContact] = useState<INiverProps>()
  const [grupo, setGrupo] = useState()
  const { id } = useGlobalSearchParams();
  const { handleSubmit, control, formState: {errors} } = useForm<INiverProps>({
    resolver: zodResolver(schema)
  })

  async function loadContact(id: string) {
    const response = await getItem()
    const data:INiverProps[] = response ? JSON.parse(response) : []
    const dataFound = data.find(d => d.id === id)
    setContact(dataFound)
  }

  function handleUpdateForm(data: INiverProps) {
    console.log(data)
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
          <Text style={stylesLocal.titleText}>Cadastro de Aniversariante:</Text>
        </View>
        <View style={styles.form}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Grupo"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="grupo"
          />
          {errors.grupo && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nome"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="nome"
          />
          {errors.nome && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="dd/mm"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType='phone-pad'
                style={styles.input}
              />
            )}
            name="datanas"
          />
          {errors.datanas && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="(62) 99999-9999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType='phone-pad'
                style={styles.input}
              />
            )}
            name="telefone"
          />
          {errors.telefone && <Text>This is required.</Text>}

          <TouchableOpacity onPress={handleSubmit(handleUpdateForm)} style={styles.bgnSubmit}>
            <Text style={styles.txtBtnSubmit}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
