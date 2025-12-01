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

import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from "../../assets/styles/SignUp.styles";
import { apiFetch } from "../utils/api";

const SignUp = () => {
  const router = useRouter();

  // Estado para o tipo de usuário selecionado
  const [userType, setUserType] = useState(null); // 'tutor', 'ong', 'clinica'

  // Estados dos campos comuns
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados específicos
  const [cnpj, setCnpj] = useState(""); // ONG
  const [cnae, setCnae] = useState(""); // ONG
  const [crmv, setCrmv] = useState(""); // Clínica

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validação básica
    if (!name || !email || !telefone || !estado || !cidade || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    // Validação de telefone (mínimo 10 dígitos)
    const telefoneNumeros = telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10) {
      Alert.alert("Erro", "Por favor, insira um telefone válido (mínimo 10 dígitos).");
      return;
    }

    // Validação de estado (2 letras)
    if (estado.length !== 2) {
      Alert.alert("Erro", "Por favor, insira a sigla do estado (ex: SP, RJ).");
      return;
    }

    // Validações específicas
    if (userType === 'ong') {
      if (!cnpj || !cnae) {
        Alert.alert("Erro", "Por favor, preencha CNPJ e CNAE.");
        return;
      }
      // Validação de CNPJ (14 dígitos)
      const cnpjNumeros = cnpj.replace(/\D/g, '');
      if (cnpjNumeros.length !== 14) {
        Alert.alert("Erro", "CNPJ deve conter 14 dígitos.");
        return;
      }
    }

    if (userType === 'clinica') {
      if (!crmv) {
        Alert.alert("Erro", "Por favor, preencha o CRMV.");
        return;
      }
    }

    // Validação de senha (mínimo 6 caracteres)
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      // Montar o body da requisição
      const body = {
        nome: name,
        email,
        senha: password,
        tipo: userType,
        telefone,
        endereco: {
          cidade,
          uf: estado.toUpperCase()
        }
      };

      // Adicionar campos específicos
      if (userType === 'ong') {
        body.cnpj = cnpj;
      }
      
      if (userType === 'clinica') {
        body.crmvResponsavel = crmv;
      }

      const response = await apiFetch('/users/registrar', {
        method: 'POST',
        body: JSON.stringify(body)
      });

      console.log('📝 Resposta do cadastro:', response);

      // Verificar se o cadastro foi bem-sucedido
      if (response && (response._id || response.id || response.token)) {
        // Limpar os campos
        setName("");
        setEmail("");
        setTelefone("");
        setEstado("");
        setCidade("");
        setPassword("");
        setConfirmPassword("");
        setCnpj("");
        setCnae("");
        setCrmv("");
        
        // Resetar tipo para seleção
        setUserType(null);
        
        // Mostrar alerta e redirecionar
        Alert.alert(
          "Sucesso!", 
          `${getUserTypeLabel()} cadastrado com sucesso! Faça login para continuar.`,
          [
            {
              text: "OK",
              onPress: () => {
                router.replace("/(auth)/signIn");
              }
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
      
      // Tratamento detalhado de erros
      let errorMessage = "Erro ao cadastrar. Tente novamente.";
      
      if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.message) {
        if (error.message.includes("Email já cadastrado")) {
          errorMessage = "Este email já está cadastrado. Faça login ou use outro email.";
        } else if (error.message.includes("network")) {
          errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
        } else {
          errorMessage = error.message;
        }
      }
      
      Alert.alert("Erro no Cadastro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeLabel = () => {
    switch(userType) {
      case 'tutor': return 'Tutor';
      case 'ong': return 'ONG';
      case 'clinica': return 'Clínica';
      default: return 'Usuário';
    }
  };

  // Se não selecionou tipo, mostrar a seleção
  if (!userType) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Novo Cadastro?</Text>
          <Text style={styles.selectionSubtitle}>Continue como</Text>

          {/* Botão Tutor */}
          <TouchableOpacity
            style={styles.typeButton}
            onPress={() => setUserType('tutor')}
          >
            <FontAwesome5
              name="paw"
              size={20}
              color="#fff"
              style={styles.typeIcon}
            />
            <Text style={styles.typeButtonText}>Tutor</Text>
          </TouchableOpacity>

          {/* Botão ONGs */}
          <TouchableOpacity
            style={styles.typeButton}
            onPress={() => setUserType('ong')}
          >
            <Entypo
              name="home"
              size={20}
              color="#fff"
              style={styles.typeIcon}
            />
            <Text style={styles.typeButtonText}>ONGs</Text>
          </TouchableOpacity>

          {/* Botão Clínica */}
          <TouchableOpacity
            style={styles.typeButton}
            onPress={() => setUserType('clinica')}
          >
            <MaterialIcons
              name="pets"
              size={22}
              color="#fff"
              style={styles.typeIcon}
            />
            <Text style={styles.typeButtonText}>Clínica</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem conta?</Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/signIn")}>
              <Text style={styles.loginButtonText}>Fazer Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Se selecionou tipo, mostrar o formulário
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setUserType(null)} // Voltar para seleção de tipo
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        {/* Título */}
        <Text style={styles.title}>Olá {getUserTypeLabel()}, crie sua conta</Text>

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

        {/* Campos específicos por tipo */}
        {userType === 'ong' && (
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
        )}

        {userType === 'clinica' && (
          <TextInput
            placeholder="CRMV *"
            placeholderTextColor="#ffffff"
            style={styles.inputFull}
            value={crmv}
            onChangeText={setCrmv}
            keyboardType="numeric"
          />
        )}

        {/* Telefone */}
        <TextInput
          placeholder="Telefone *"
          placeholderTextColor="#ffffff"
          style={styles.inputFull}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        {/* Estado e Cidade */}
        <View style={styles.rowContainer}>
          <TextInput
            placeholder="Estado *"
            placeholderTextColor="#ffffff"
            style={styles.inputHalf}
            value={estado}
            onChangeText={setEstado}
            maxLength={2}
            autoCapitalize="characters"
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
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha *"
            placeholderTextColor="#ffffff"
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Confirmar Senha */}
        <TextInput
          placeholder="Confirmar Senha *"
          placeholderTextColor="#ffffff"
          style={styles.inputFull}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />

        {/* Botão Cadastrar */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signUpButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        {/* Link para Login */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem conta?</Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/signIn")}>
            <Text style={styles.loginButtonText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;
