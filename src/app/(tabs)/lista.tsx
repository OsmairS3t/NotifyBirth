import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Header from '../../component/header';

import { styles } from '../../style/styles';

export default function Lista() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      
      <View style={styles.containerTab}>
        <Text>Lista</Text>
      </View>
    </SafeAreaView>
  )
}
