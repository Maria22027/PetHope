import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { styles } from "../../assets/styles/OngSignUp.styles";
import { apiFetch } from "../utils/api";

const { width } = Dimensions.get('window');

const OngSignUp = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cnae, setCnae] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOngSignUp = async () => {
    if (!name || !email ||!telefone || !estado || !cidade || !password || !confirmPassword || !cnpj || !cnae) {
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
          tipo: 'ong',
          telefone,
          cnpj,
          endereco: {
            cidade,
            uf: estado
          }
        })
      });

      console.log('📝 Resposta do cadastro:', response);

      if (response && (response._id || response.id || response.token)) {
        Alert.alert(
          "Sucesso!", 
          "ONG cadastrada com sucesso! Faça login para continuar.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/(auth)/signIn")
            }
          ],
          { cancelable: false }
        );
        
        // Garantir redirecionamento mesmo se o Alert não funcionar (ex: na web)
        setTimeout(() => {
          router.replace("/(auth)/signIn");
        }, 100);
      } else {
        throw new Error("Resposta inesperada do servidor");
      }
    } catch (error) {
      console.error('SignUp error:', error);
      
      let errorMessage = "Erro ao cadastrar. Tente novamente.";
      if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.message?.includes("Email já cadastrado")) {
        errorMessage = "Este email já está cadastrado. Faça login ou use outro email.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      Alert.alert("Erro no Cadastro", errorMessage);
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
          {/* Ícone de Seta (Ionicons do Expo) */}
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {/* O logo "PetHope" ficaria no topo da curva, mas omitido aqui para seguir a imagem de referência */}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >

        {/* Título */}
        <Text style={styles.title}>Olá ONG, crie sua conta</Text>

        {/* --- Campos de Input --- */}

        {/* Nome */}
        <TextInput
          placeholder="Nome *"
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

        {/* CNPJ e CNAE (Lado a Lado) */}
        <View style={styles.rowContainer}>
          <TextInput
            placeholder="CNPJ *"
            placeholderTextColor="#ffffff"
            style={styles.inputHalf}
            value={cnpj}
            onChangeText={setCnpj}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="CNAE *"
            placeholderTextColor="#ffffff"
            style={styles.inputHalf}
            value={cnae}
            onChangeText={setCnae}
            keyboardType="numeric"
          />
        </View>

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
          onPress={handleOngSignUp}
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
}

export default OngSignUp;