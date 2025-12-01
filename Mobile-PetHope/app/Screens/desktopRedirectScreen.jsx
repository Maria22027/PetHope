import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/styles/DesktopRedirectScreen.styles";
import { apiFetch, clearToken } from "../utils/api";

// Importa Modal apenas para mobile/native
let Modal;
if (Platform.OS !== 'web') {
  const RN = require('react-native');
  Modal = RN.Modal;
}

const DesktopRedirectScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await apiFetch('/users/me');
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  };

  const handleSignOut = () => {
    setShowConfirm(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await clearToken();
      setShowConfirm(false);
      await new Promise(resolve => setTimeout(resolve, 500));
      router.replace("/(auth)/signIn");
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Erro', 'Não foi possível sair');
      setIsLoggingOut(false);
      setShowConfirm(false);
    }
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  const getUserTypeLabel = () => {
    if (user?.tipo === 'clinica') return 'Clínica Veterinária';
    if (user?.tipo === 'ong') return 'ONG';
    return 'Organização';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header com ícone */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons 
              name={user?.tipo === 'clinica' ? 'medical' : 'heart'} 
              size={60} 
              color="#E53935" 
            />
          </View>
          <Text style={styles.welcomeText}>Olá, {user?.nome}!</Text>
          <Text style={styles.userType}>{getUserTypeLabel()}</Text>
        </View>

        {/* Card de Informação Principal */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="desktop-outline" size={40} color="#E53935" />
            <Text style={styles.mainCardTitle}>Versão Desktop Necessária</Text>
          </View>
          
          <Text style={styles.mainCardText}>
            O gerenciamento completo de pets e campanhas está disponível exclusivamente na 
            <Text style={styles.boldText}> versão Desktop </Text> 
            do PetHope.
          </Text>
        </View>

        {/* Funcionalidades Disponíveis no Desktop */}
        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>Funcionalidades Desktop:</Text>
          
          <View style={styles.featureItem}>
            <Ionicons name="paw" size={24} color="#4CAF50" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Cadastro de Pets</Text>
              <Text style={styles.featureDescription}>
                Adicione, edite e gerencie todos os pets disponíveis
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="megaphone" size={24} color="#FF6F00" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Gestão de Campanhas</Text>
              <Text style={styles.featureDescription}>
                Crie e administre campanhas de adoção e doação
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="bar-chart" size={24} color="#2196F3" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Relatórios Completos</Text>
              <Text style={styles.featureDescription}>
                Acesse estatísticas e históricos detalhados
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="cloud-upload" size={24} color="#9C27B0" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Upload de Imagens</Text>
              <Text style={styles.featureDescription}>
                Adicione fotos de alta qualidade dos pets
              </Text>
            </View>
          </View>
        </View>

        {/* Card de Instrução */}
        <View style={styles.instructionCard}>
          <Ionicons name="information-circle" size={30} color="#2196F3" />
          <Text style={styles.instructionText}>
            Para acessar essas funcionalidades, faça login na versão Desktop do PetHope 
            em seu computador.
          </Text>
        </View>

        {/* Botão Sair */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleSignOut}
          disabled={isLoggingOut}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutButtonText}>
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Confirmação */}
      {showConfirm && (
        Platform.OS !== 'web' && Modal ? (
          <Modal
            transparent
            visible={showConfirm}
            animationType="fade"
            onRequestClose={cancelLogout}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Deslogar</Text>
                <Text style={styles.modalText}>Tem certeza que deseja sair?</Text>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.modalCancelButton} 
                    onPress={cancelLogout}
                    disabled={isLoggingOut}
                  >
                    <Text style={styles.modalCancelText}>Cancelar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.modalConfirmButton} 
                    onPress={confirmLogout}
                    disabled={isLoggingOut}
                  >
                    <Text style={styles.modalConfirmText}>
                      {isLoggingOut ? 'Saindo...' : 'Sair'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Deslogar</Text>
              <Text style={styles.modalText}>Tem certeza que deseja sair?</Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalCancelButton} 
                  onPress={cancelLogout}
                  disabled={isLoggingOut}
                >
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalConfirmButton} 
                  onPress={confirmLogout}
                  disabled={isLoggingOut}
                >
                  <Text style={styles.modalConfirmText}>
                    {isLoggingOut ? 'Saindo...' : 'Sair'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

export default DesktopRedirectScreen;
