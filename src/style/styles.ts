import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  containerTab: {
    height: 'auto',
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  listMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 60,
    backgroundColor: '#e6e6e6',
  },

  textMessage: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 10,
  },

  btnMessage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9900',
    height: 45,
    width: 45,
    borderRadius: 10,
  },

  textBtnMessage: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
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
    height: 55,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FF9900',
    borderWidth: 2,
    borderColor: '#CC7C03',
  },

  txtBtnSubmit: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600'
  }

});