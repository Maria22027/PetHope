import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/styles/HomeScreen.styles";
import { apiFetch } from "../utils/api";

const HomeScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('🔄 Iniciando carregamento de dados...');
      
      const [userData, petsData, campaignsData] = await Promise.all([
        apiFetch('/users/me').catch(err => {
          console.log('⚠️ Erro ao carregar usuário:', err.message);
          return null;
        }),
        apiFetch('/pets').catch(err => {
          console.log('⚠️ Erro ao carregar pets:', err.message);
          return [];
        }),
        apiFetch('/campaigns').catch(err => {
          console.log('⚠️ Erro ao carregar campanhas:', err.message);
          return [];
        })
      ]);
      
      console.log('📦 Dados recebidos:', {
        user: !!userData,
        pets: Array.isArray(petsData) ? petsData.length : 0,
        campaigns: Array.isArray(campaignsData) ? campaignsData.length : 0
      });
      
      setUser(userData);
      // Garante que são arrays antes de usar slice
      setPets(Array.isArray(petsData) ? petsData.slice(0, 10) : []);
      setCampaigns(Array.isArray(campaignsData) ? campaignsData.slice(0, 10) : []);
      setError(null);
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error);
      setError(error.message);
      setPets([]);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const renderPetCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.petCard}
      onPress={() => router.push(`/Screens/detalhesScreen?id=${item._id}`)}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.petCardImage} />
      ) : (
        <View style={styles.petCardPlaceholder}>
          <Ionicons name="paw" size={40} color="#ccc" />
        </View>
      )}
      <Text style={styles.petCardName}>{item.nome}</Text>
      <Text style={styles.petCardInfo}>{item.especie}</Text>
    </TouchableOpacity>
  );

  const renderCampaignCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.campaignCard}
      onPress={() => router.push(`/Screens/detalhesCampanhaScreen?id=${item._id}`)}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.campaignCardImage} />
      ) : (
        <View style={styles.campaignCardPlaceholder}>
          <Ionicons name="megaphone" size={40} color="#fff" />
        </View>
      )}
      <View style={styles.campaignCardContent}>
        <Text style={styles.campaignCardTitle} numberOfLines={2}>
          {item.titulo}
        </Text>
        <Text style={styles.campaignCardDescription} numberOfLines={2}>
          {item.descricao}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com Bem-vindo */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo(a),</Text>
          <Text style={styles.userName}>{user?.nome || "Usuário"}!</Text>
          {error && (
            <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
              Erro ao conectar com servidor
            </Text>
          )}
        </View>

        {/* Seção de Campanhas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Campanhas Ativas</Text>
            <TouchableOpacity onPress={() => router.push("/Screens/campanhasScreen")}>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          {campaigns.length > 0 ? (
            <FlatList
              horizontal
              data={campaigns}
              renderItem={renderCampaignCard}
              keyExtractor={(item, index) => item._id?.toString() || `campaign-${index}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          ) : (
            <Text style={styles.emptyText}>Nenhuma campanha disponível</Text>
          )}
        </View>

        {/* Seção de Pets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Animais Disponíveis</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/adotar")}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {pets.length > 0 ? (
            <FlatList
              horizontal
              data={pets}
              renderItem={renderPetCard}
              keyExtractor={(item, index) => item._id?.toString() || `pet-${index}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          ) : (
            <Text style={styles.emptyText}>Nenhum pet disponível</Text>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;