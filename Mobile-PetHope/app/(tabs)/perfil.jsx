import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { styles } from "../../assets/styles/PerfilScreen.styles";
import { apiFetch, clearToken } from '../utils/api';

// Importa Modal apenas para mobile/native
let Modal;
if (Platform.OS !== 'web') {
  const RN = require('react-native');
  Modal = RN.Modal;
}

const UserProfileScreen = () => {
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [user, setUser] = useState(null);

    // Recarrega dados do usuário sempre que a tela recebe foco
    useFocusEffect(
      useCallback(() => {
        let mounted = true;
        async function load() {
          try {
            const data = await apiFetch('/users/me');
            if (mounted) setUser(data);
          } catch (err) {
            console.error('Erro ao carregar usuário:', err.message || err);
          }
        }
        load();
        return () => { mounted = false; };
      }, [])
    );

    const handleSignOut = () => {
        setShowConfirm(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            console.log('Starting logout...');
            await clearToken();
            console.log('Token cleared successfully');
            setShowConfirm(false);
            await new Promise(resolve => setTimeout(resolve, 500));
            router.replace("/(auth)/signIn");
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggingOut(false);
            setShowConfirm(false);
        }
    };

    const cancelLogout = () => {
        setShowConfirm(false);
    };




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        
        {/* Seção de Cabeçalho do Perfil (Foto, Nome e Edição) */}
        <View style={styles.header}>
          {/* Imagem/Ícone de Perfil */}
          <View style={styles.profileIconContainer}>
            {/* Ícone de Usuário (Fonte FontAwesome5) */}
            <FontAwesome5 name="user-alt" size={60} color="#fff" />
          </View>

          {/* Dados do Usuário */}
          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>{user?.nome || 'Nome completo'}</Text>
            <Text style={styles.typeText}>{user?.tipo || 'Tipo de cadastro'}</Text>
          </View>
          
          {/* Botão de Edição */}
          <TouchableOpacity style={styles.editButton} activeOpacity={0.7} onPress={() => router.push("../Screens/editPerfil")}>
             {/* Ícone de Lápis (Fonte Feather) */}
            <Feather name="edit-3" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Linha Divisória */}
        <View style={styles.divider} />

        {/* Seção Meus dados */}
        <View style={styles.dataSection}>
          <Text style={styles.sectionTitle}>Meus dados:</Text>
          
          <Text style={styles.dataLabel}>Email</Text>
          <Text style={styles.dataValue}>{user?.email || '—'}</Text>

          <Text style={styles.dataLabel}>Telefone</Text>
          <Text style={styles.dataValue}>{user?.telefone || '—'}</Text>

          <Text style={styles.dataLabel}>Cidade</Text>
          <Text style={styles.dataValue}>{user?.cidade || '—'}</Text>
        </View>

        {/* Espaçador para empurrar o botão Sair para baixo (se o conteúdo for pequeno) */}
        <View style={styles.spacer} />

        {/* Botão Sair */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleSignOut} disabled={isLoggingOut}>
          <Text style={styles.logoutButtonText}>{isLoggingOut ? 'Saindo...' : 'Sair'}</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Modal de Confirmação - apenas para mobile/native */}
      {Platform.OS !== 'web' && Modal && (
        <Modal
          transparent
          visible={showConfirm}
          animationType="fade"
          onRequestClose={cancelLogout}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '80%', maxWidth: 300 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Deslogar</Text>
              <Text style={{ fontSize: 14, marginBottom: 20, color: '#666' }}>Tem certeza que deseja sair?</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                <TouchableOpacity 
                  style={{ paddingHorizontal: 15, paddingVertical: 10 }} 
                  onPress={cancelLogout}
                  disabled={isLoggingOut}
                >
                  <Text style={{ color: '#007AFF', fontSize: 16 }}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{ paddingHorizontal: 15, paddingVertical: 10 }} 
                  onPress={confirmLogout}
                  disabled={isLoggingOut}
                >
                  <Text style={{ color: '#FF3B30', fontSize: 16, fontWeight: 'bold' }}>
                    {isLoggingOut ? 'Saindo...' : 'Sair'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Diálogo de confirmação - apenas para web */}
      {Platform.OS === 'web' && showConfirm && (
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 999
        }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '80%', maxWidth: 300 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Deslogar</Text>
            <Text style={{ fontSize: 14, marginBottom: 20, color: '#666' }}>Tem certeza que deseja sair?</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
              <TouchableOpacity 
                style={{ paddingHorizontal: 15, paddingVertical: 10 }} 
                onPress={cancelLogout}
                disabled={isLoggingOut}
              >
                <Text style={{ color: '#007AFF', fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ paddingHorizontal: 15, paddingVertical: 10 }} 
                onPress={confirmLogout}
                disabled={isLoggingOut}
              >
                <Text style={{ color: '#FF3B30', fontSize: 16, fontWeight: 'bold' }}>
                  {isLoggingOut ? 'Saindo...' : 'Sair'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

// ... Definição dos estilos viria aqui (const styles = StyleSheet.create({ ... }));

export default UserProfileScreen;