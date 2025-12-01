import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/styles/CampanhasScreen.styles";
import { apiFetch } from "../utils/api";

const CampanhasScreen = () => {
  const router = useRouter();
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCampanhas();
  }, []);

  const loadCampanhas = async () => {
    try {
      const data = await apiFetch('/campaigns');
      setCampanhas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar campanhas:", error);
      setCampanhas([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCampanhas();
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return null;
    }
  };

  const renderCampanhaCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.campanhaCard}
      onPress={() => router.push(`/Screens/detalhesCampanhaScreen?id=${item._id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.campanhaImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="megaphone" size={60} color="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.campanhaTitulo} numberOfLines={2}>{item.titulo}</Text>
        
        {item.descricao && (
          <Text style={styles.campanhaDescricao} numberOfLines={3}>
            {item.descricao}
          </Text>
        )}

        {item.data && (
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#E53935" />
            <Text style={styles.dataText}>{formatDate(item.data)}</Text>
          </View>
        )}

        {item.organizacaoId && item.organizacaoId.nome && (
          <View style={styles.organizationRow}>
            <Ionicons name="business-outline" size={16} color="#666" />
            <Text style={styles.organizationText}>{item.organizacaoId.nome}</Text>
          </View>
        )}
      </View>

      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={24} color="#E53935" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Carregando campanhas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Todas as Campanhas</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {campanhas.length} {campanhas.length === 1 ? 'campanha ativa' : 'campanhas ativas'}
        </Text>
      </View>

      <FlatList
        data={campanhas}
        renderItem={renderCampanhaCard}
        keyExtractor={(item, index) => item._id?.toString() || `campanha-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="megaphone-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma campanha disponível no momento</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

export default CampanhasScreen;
