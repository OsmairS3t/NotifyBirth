import { StatusBar } from 'expo-status-bar';
import { Text, View } from "react-native";
import { Image } from 'expo-image'
import Home from "./src/screens/home";

import { styles } from "./src/styles";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blockHeader}>
        
      </View>
      <Image 
        source={require('./src/assets/logo.png')} 
        style={styles.imageHeader} 
      />      
      <Home />
      <View style={styles.footer} />
      <StatusBar style="auto" />
    </View>
  )
}


