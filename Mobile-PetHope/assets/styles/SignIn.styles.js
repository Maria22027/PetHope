import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Cabeçalho com patinhas e bem-vindo
    header: {
        backgroundColor: "#E53935",
        height: 150,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        marginBottom: 20,
    },
    pawsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    pawLeft: {
        marginRight: 15,
        opacity: 0.9,
    },
    pawRight: {
        marginLeft: 15,
        opacity: 0.9,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
    },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        backgroundColor: "transparent",
    },

    title: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 40,
        marginLeft: 0,
        color: "#E53935",
        textAlign: "center",
    },

    // Estilo do container para o input de senha e o botão "Mostrar Senha"
    passwordContainer: {
        width: "100%",
        // Remove o marginBottom do input principal e o aplica ao container
        marginBottom: 40,
    },

    // Inputs de Email/Senha
    input: {
        width: "100%",
        // Cor dos inputs da imagem
        backgroundColor: "#A8DDE0",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8, // Ajustado para ser suave
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "500",
        height: 50, // Altura definida
        marginBottom: 0, // Removido, controlado pelo container
    },

    // Adicionado para dar espaço após o input de Email
    inputEmail: {
        marginBottom: 15,
    },

    // Botão Mostrar Senha
    showPasswordButton: {
        position: "absolute",
        right: 5,
        bottom: -20, // Ajuste para que o texto fique abaixo da caixa de input, alinhado à direita
        padding: 5,
    },

    showPasswordText: {
        fontSize: 13,
        color: "#555555",
    },

    // Botão Entrar
    loginButton: {
        backgroundColor: "#FF5E54",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40, // Espaço após a área da senha
        width: "100%",
    },

    loginButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
    },

    // Rodapé: Não tem conta? Cadastre-se
    footer: {
        flexDirection: "row",
        justifyContent: "flex-start", // Alinha à esquerda
        alignItems: "center",
        marginTop: 150, // Mais espaço para empurrar para o rodapé da tela
    },

    footerText: {
        fontSize: 15,
        color: "#000000",
        marginRight: 10,
    },

    // Botão Cadastre-se
    cadastroButtonContainer: {
        backgroundColor: "#4EC7D3",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },

    cadastroButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "700",
    },
});