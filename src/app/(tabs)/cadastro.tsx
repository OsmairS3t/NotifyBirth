import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import uuid from 'react-native-uuid'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { TextInputMask } from 'react-native-masked-text';
import { SelectList } from 'react-native-dropdown-select-list';

import Header from '../../component/header';
import { styles } from '../../style/styles';
import { INiverProps, ISelectProps } from '../../utils/interface';
import { supabase } from '../../database';

const schema = z.object({
  nome: z.string().min(2, {message: 'É necessário informar pelo menos 2 caracteres'}),
  datanas: z.string(),
  telefone: z.string(),
})

export default function Cadastro() {
  const [selected, setSelected] = useState("")
  const [data, setData] = useState<ISelectProps[]>([]);
  const [grupos, setGrupos] = useState([{ nomegrupo: ''}])
  const [errGrupo, setErrGrupo] = useState('')
  const { getItem, setItem } = useAsyncStorage('@notifybirth:contacts')
  const {control, handleSubmit, reset, formState: { errors }} = useForm<INiverProps>({
    resolver: zodResolver(schema)
  })

  async function loadGrupos() {
    const response = await supabase.from('groups').select('*')
    if (response.data) {
      setGrupos(response.data)
      let newArray: ISelectProps[] = grupos.map(grupo => {
        return { key: grupo.nomegrupo, value: grupo.nomegrupo }
      })
      setData(newArray)
    }
  }

  async function handleSubmitForm(data: INiverProps) {
    const newData = {
      id: uuid.v4(),
      grupo: selected,
      nome: data.nome,
      datanas: data.datanas,
      telefone: data.telefone
    }
    console.log(newData)
    try {
      // quem sabe em um offline-first
      // const response = await getItem()
      // const currentData = response ? JSON.parse(response) : []
      // const updatedData = [...currentData, newData]
      // await setItem(JSON.stringify(updatedData))
      await supabase.from('contacts').insert({
        grupo: selected,
        nome: data.nome,
        datanas: data.datanas,
        telefone: data.telefone
      })
      Alert.alert("Cadastro efetuado com sucesso")
      // Toast.show({
      //   type: "success",
      //   text1: "Cadastro efetuado com sucesso"
      // })
    } catch (error) {
      Alert.alert("Ocorreu um erro ao tentar salvar: " + error)
      // Toast.show({
      //   type: "error",
      //   text1: "Ocorreu um erro ao tentar salvar.",
      //   text2: `${error}`
      // })
    }
    reset()
  }

  useEffect(() => {
    loadGrupos()
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.containerTab}>
        <Text style={styles.titleInformation}>Incluir Aniversariantes:</Text>
        <View style={styles.form}>
          <SelectList
            placeholder='Grupo'
            setSelected={(val: string) => setSelected(val)}
            data={data}
            save="key"
            boxStyles={styles.input}
            inputStyles={{margin:0, padding: 0, fontSize: 20, color: '#858585'}}
          />
          {errGrupo !== '' && <Text>{errGrupo}</Text>}

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
              <TextInputMask
                type='datetime'
                options={{
                  maskType: 'BRL',
                  format: 'dd/mm',
                }}
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
              <TextInputMask
                type='cel-phone'
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '99 '
                }}
                placeholder="62 99999-9999"
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
