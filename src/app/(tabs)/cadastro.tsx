import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import uuid from 'react-native-uuid'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import Header from '../../component/header';
import { styles } from '../../style/styles';
import { INiverProps } from '../../utils/interface';

const schema = z.object({
  grupo: z.string().min(2, {message: 'É necessário informar pelo menos 2 caracteres'}),
  nome: z.string().min(2, {message: 'É necessário informar pelo menos 2 caracteres'}),
  datanas: z.string(),
  telefone: z.string(),
})

export default function Cadastro() {
  const { getItem, setItem } = useAsyncStorage('@notifybirth:contacts')
  const {control, handleSubmit, reset, formState: { errors }} = useForm<INiverProps>({
    resolver: zodResolver(schema)
  })

  async function handleSubmitForm(data: INiverProps) {
    const newData = {
      id: uuid.v4(),
      grupo: data.grupo,
      nome: data.nome,
      datanas: data.datanas,
      telefone: data.telefone
    }
    try {
      const response = await getItem()
      const currentData = response ? JSON.parse(response) : []

      const updatedData = [...currentData, newData]

      await setItem(JSON.stringify(updatedData))
      Toast.show({
        type: "success",
        text1: "Cadastro efetuado com sucesso"
      })
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ocorreu um erro ao tentar salvar.",
        text2: `${error}`
      })
    }
    reset()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.containerTab}>
        <Text style={styles.titleInformation}>Incluir Aniversariantes:</Text>
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

          <TouchableOpacity onPress={handleSubmit(handleSubmitForm)} style={styles.bgnSubmit}>
            <Text style={styles.txtBtnSubmit}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
