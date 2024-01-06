import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import Header from '../../component/header';
import { styles } from '../../style/styles';
import { INiverProps } from '../../utils/interface';

const schema = z.object({
  equipe: z.string().min(2, {message: 'É necessário informar pelo menos 2 caracteres'}),
  nome: z.string().min(2, {message: 'É necessário informar pelo menos 2 caracteres'}),
  datanas: z.string(),
  telefone: z.string(),
})

export default function Cadastro() {
  const {control, register, handleSubmit, reset, formState: { errors }} = useForm<INiverProps>({
    resolver: zodResolver(schema)
  })

  function handleSubmitForm(data: INiverProps) {
    console.log(data)
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
                placeholder="Equipe"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="equipe"
          />
          {errors.equipe && <Text>This is required.</Text>}

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
