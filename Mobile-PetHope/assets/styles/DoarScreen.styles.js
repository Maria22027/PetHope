import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  divider: {
    height: 1,
    backgroundColor: 'red',
    marginBottom: 20,
  },

  bold: {
    fontWeight: "800",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },

  list: {
    fontSize: 15,
    color: "#444",
    marginTop: 6,
    lineHeight: 22,
  },

  greenBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0FA958",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: "center",
  },

  redBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53935",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "center",
  },

  grayBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6F6F6F",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },

  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F3',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#E53935',
  },

  counterTextContainer: {
    marginLeft: 15,
    flex: 1,
  },

  counterNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E53935',
  },

  counterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },

  counterSubLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});