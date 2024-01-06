import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import Header from '../../component/header';
import { aniversariantes } from '../../utils/database';

import { styles } from '../../style/styles';

export default function Lista() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      
      <View style={styles.containerTab}>
        <Text style={styles.titleInformation}>Listagem:</Text>
        <FlatList 
          data={aniversariantes}
          renderItem={item => (
            <View style={styles.itemList}>
              <Text style={{width: 230}}>{item.item.nome} ({item.item.equipe})</Text>
              <Text>{item.item.datanas}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
