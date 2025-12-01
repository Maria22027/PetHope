import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Certifique-se de instalar: expo install react-native-safe-area-context
import { SafeAreaView } from 'react-native-safe-area-context';

// **ATENÇÃO:** O arquivo de estilos deve ser alterado (como na resposta anterior)
// para remover 'position: absolute', 'top', 'left', 'zIndex' do backButton.
import { styles } from "../../assets/styles/EditPerfil.styles";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { apiFetch } from '../utils/api';

const EditPerfilScreen = () => {
    const router = useRouter();

    // Estados para simular a entrada de dados
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const data = await apiFetch('/users/me');
            setName(data.nome || '');
            setEmail(data.email || '');
            setTelefone(data.telefone || '');
            setEstado(data.estado || '');
            setCidade(data.cidade || '');
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            Alert.alert('Erro', 'Não foi possível carregar seus dados');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveChanges = async () => {
        if (!name || !email || !telefone || !cidade) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios');
            return;
        }

        setSaving(true);
        try {
            await apiFetch('/users/me', {
                method: 'PUT',
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    telefone: telefone,
                    estado: estado,
                    cidade: cidade
                })
            });

            Alert.alert('Sucesso', 'Suas informações foram atualizadas!', [
                { text: 'OK', onPress: () => router.replace("../(tabs)/perfil") }
            ]);
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            Alert.alert('Erro', 'Não foi possível salvar as alterações');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Carregando...</Text>
                </View>
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* *** MUDANÇA AQUI: Botão de voltar movido para o fluxo de conteúdo, 
                antes do primeiro fieldContainer, e o View de 'header' foi removido. 
                */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace("../(tabs)/perfil")}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                {/* *** FIM DA MUDANÇA NO POSICIONAMENTO DO BOTÃO *** */}

                {/* Campo Nome */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        placeholder="Nome completo"
                        placeholderTextColor="#ffffff"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}

                    />
                </View>

                {/* Campo Email */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="email"
                        placeholderTextColor="#ffffff"
                    />
                </View>

                {/* Campo Telefone */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                        placeholder="telefone"
                        placeholderTextColor="#ffffff"
                    />
                </View>

                {/* Seção Endereço (Estado e Cidade lado a lado) */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Endereço</Text>
                    <View style={styles.addressContainer}>
                        {/* Campo Estado */}
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            value={estado}
                            onChangeText={setEstado}
                            placeholder="Estado"
                            placeholderTextColor="#ffffff"
                        />
                        {/* Campo Cidade */}
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            value={cidade}
                            onChangeText={setCidade}
                            placeholder="Cidade"
                            placeholderTextColor="#ffffff"
                        />
                    </View>
                </View>

                {/* Botão de Confirmação */}
                <TouchableOpacity
                    style={styles.confirmButton}
                    activeOpacity={0.8}
                    onPress={handleSaveChanges}
                    disabled={saving}
                >
                    <Text style={styles.confirmButtonText}>
                        {saving ? 'Salvando...' : 'Confirmar alterações'}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default EditPerfilScreen;