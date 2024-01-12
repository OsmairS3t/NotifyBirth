import { StyleSheet } from "react-native";

export const stylesLocal = StyleSheet.create({

  titleBack: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },

  titleText: {
    fontSize: 20,
    fontWeight: '500',
  },

  cadastro: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 4,
  },

  groupItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
  },

  itemTitleCadastro: {
    fontWeight: '600',
    fontSize: 18,
  },

  itemCadastro: {
    fontSize: 18,
  },

  input: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    alignItems: 'center',
    height: 45,
    width: 200,
    fontSize: 18,
    padding: 10,
  },

  btnSave: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CC7C03',
    backgroundColor: '#FF9900',
    gap: 4
  },

  textBtn: {
    fontWeight: '600',
    fontSize: 18,
    color: '#ffffff',
  },

})