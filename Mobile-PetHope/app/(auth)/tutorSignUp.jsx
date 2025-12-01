import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "../../assets/styles/TutorSignUp.styles";
import { apiFetch, saveToken } from "../utils/api";

const SignUpScreen = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [telefone, setTelefone] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");

    const handleTutorSignUp = async () => {
        if (!name || !email || !telefone || !estado || !cidade || !password || !confirmPassword) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios (*).");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            const response = await apiFetch('/users/registrar', {
                method: 'POST',
                body: JSON.stringify({
                    nome: name,
                    email,
                    senha: password,
                    tipo: 'tutor',
                    telefone,
                    endereco: {
                        cidade,
                        uf: estado
                    }
                })
            });

            if (response && response._id) {
                Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
                // Fazer login automático
                const loginResponse = await apiFetch('/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, senha: password })
                });
                
                if (loginResponse?.token) {
                    await saveToken(loginResponse.token);
                    router.replace("/");
                }
            }
        } catch (error) {
            const message = error?.data?.error || error.message || "Erro ao cadastrar";
            Alert.alert("Erro", message);
            console.error('SignUp error', error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#fff" }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >

            {/* Cabeçalho Vermelho com Curvas e Botão de Voltar */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >

                {/* Título */}
                <Text style={styles.title}>Olá Tutor, crie sua conta</Text>

                {/* --- Campos de Input --- */}

                {/* Nome completo */}
                <TextInput
                    placeholder="Nome completo *"
                    placeholderTextColor="#ffffff"
                    style={styles.inputFull}
                    value={name}
                    onChangeText={setName}
                />

                {/* Email */}
                <TextInput
                    placeholder="Email *"
                    placeholderTextColor="#ffffff"
                    style={styles.inputFull}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Telefone */}
                <TextInput
                    placeholder="Telefone *"
                    placeholderTextColor="#ffffff"
                    style={styles.inputFull}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                />

                {/* Estado e Cidade (Lado a Lado) */}
                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder="Estado *"
                        placeholderTextColor="#ffffff"
                        style={styles.inputHalf}
                        value={estado}
                        onChangeText={setEstado}
                    />
                    <TextInput
                        placeholder="Cidade *"
                        placeholderTextColor="#ffffff"
                        style={styles.inputHalf}
                        value={cidade}
                        onChangeText={setCidade}
                    />
                </View>

                {/* Senha */}
                <TextInput
                    placeholder="Senha *"
                    placeholderTextColor="#ffffff"
                    style={styles.inputFull}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Confirmar Senha */}
                <TextInput
                    placeholder="Confirmar senha *"
                    placeholderTextColor="#ffffff"
                    style={styles.inputFull}
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Termos de Serviço e Mostrar Senha */}
                <View style={styles.legalRow}>
                    <Text style={styles.legalText}>Termos de Serviço</Text>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.showPasswordText}>
                            {showPassword ? "Ocultar senha" : "Mostrar senha"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Botão Cadastrar */}
                <TouchableOpacity
                    style={styles.cadastroButton}
                    onPress={handleTutorSignUp}

                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.cadastroButtonText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>

                {/* Rodapé (Já tem conta? Fazer Login) */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Já tem conta?</Text>

                    <TouchableOpacity
                        style={styles.loginButtonContainer}
                        onPress={() => router.push("../(auth)/signIn")}
                    >
                        <Text style={styles.loginButtonText}>Fazer Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default SignUpScreen;