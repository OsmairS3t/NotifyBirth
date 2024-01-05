import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Header from '../../component/header';

import { styles } from '../../style/styles';

export default function Cadastro() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.containerTab}>
        <Text>Incluir Aniversariantes</Text>
      </View>
    </SafeAreaView>
  )
}
