import { Image } from "expo-image";
import { View } from "react-native";

import { styles } from '../style/styles'

export default function Header() {
  return(
    <View>
      <View style={styles.blockHeader} />
      <Image 
        source={require('../../src/assets/logo.png')} 
        style={styles.imageHeader} 
      />   
    </View>
  )
}