import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  containerTab: {
    height: 'auto',
    marginTop: 50,
    marginLeft: 22,
    marginRight: 22,
    marginBottom: 130,
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

  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    padding: 10,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#015663',
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

  form: {
    flex: 1,
    marginTop: 10,
    gap: 10,
  },

  input: {
    borderWidth: 1,
    height: 56,
    width: '100%',
    padding: 10,
    fontSize: 20,
    borderRadius: 6,
    borderColor: '#d2d2d2',
    backgroundColor: "#eaeaea",
  },

  bgnSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#015663',
  },

  txtBtnSubmit: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600'
  }

});