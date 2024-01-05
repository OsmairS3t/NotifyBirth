import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  blockHeader: {
    backgroundColor: '#000',
    width: Dimensions.get('window').width,
    height: 80,
    marginTop: 0,
  },

  imageHeader: {
    position: 'absolute',
    top: 5,
    width: 250,
    height: 120,
    alignSelf: 'center',
  },

  footer: {
    backgroundColor: '#FF9900',
    height: 57,
  }
});