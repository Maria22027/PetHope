import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // Cabeçalho
  header: {
    backgroundColor: "#E53935",
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    marginTop: 20,
  },

  // Container de seleção de tipo
  selectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 50,
  },
  selectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E53935",
    marginBottom: 10,
    textAlign: "center",
  },
  selectionSubtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },

  // Botões de tipo de usuário
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E53935",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: Math.min(width * 0.7, 280),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  typeIcon: {
    marginRight: 10,
  },
  typeButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Container do formulário
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 50,
  },

  // Título
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E53935",
    textAlign: "center",
    marginBottom: 30,
  },

  // Inputs
  inputFull: {
    width: "100%",
    height: 50,
    backgroundColor: "#E53935",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#fff",
    fontSize: 16,
  },

  inputHalf: {
    width: "48%",
    height: 50,
    backgroundColor: "#E53935",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },

  // Container de senha com olhinho
  passwordContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53935",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: "100%",
    color: "#fff",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },

  // Botão de cadastro
  signUpButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Footer
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  loginButtonText: {
    fontSize: 16,
    color: "#E53935",
    fontWeight: "bold",
  },
});
