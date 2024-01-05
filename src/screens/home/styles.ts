import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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