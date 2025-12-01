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
    View,
} from "react-native";

import { styles } from "../../assets/styles/SignIn.styles";
import { loginRequest, saveToken } from "../utils/api";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o email e a senha.");
      return;
    }
    setLoading(true);

    try {
      const data = await loginRequest(email, password);
      if (data?.token) {
        await saveToken(data.token);
        // Redireciona para a raiz, que vai checar o token e ir para /(tabs)
        router.replace("/");
      } else {
        Alert.alert('Erro de Login', 'Resposta inválida do servidor.');
        console.error('Login response', data);
      }
    } catch (err) {
      console.error('Login error', err);
      const message = err?.data?.error || err.message || 'Ocorreu um erro ao autenticar.';
      Alert.alert('Erro', message);
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}

        style={styles.container}
      >

        {/* Título "Login" no topo */}
        <Text style={styles.title}>Login</Text>

        {/* Input Email (Agora o estilo azul é aplicado diretamente no TextInput) */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ffffff"
          style={[styles.input, styles.inputEmail]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Input Senha e Mostrar Senha */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#ffffff"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          {/* Mostrar Senha */}
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showPasswordText}>
              Mostrar senha
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* Rodapé: "Não tem conta? Cadastre-se" */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem conta?</Text>

          <TouchableOpacity
            style={styles.cadastroButtonContainer}
            onPress={() => router.push("/chooseScreen")}
          >
            <Text style={styles.cadastroButtonText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default SignIn;