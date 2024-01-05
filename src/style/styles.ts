import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  containerTab: {
    marginTop: 50,
  },

  blockHeader: {
    backgroundColor: '#000000',
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
  
  titleInformation: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "500",
  },

  listContainer: {
    borderBottomWidth: 1,
    borderColor: '#FF9900',
    marginTop: 10,
    marginBottom: 4,
    flexDirection: 'row',
    gap: 4
  },

  itemListOne: {
    width: 250,
  },

  itemListTwo: {
    width: 60,
  },

  itemListTree: {
    width: 50,
  },
});