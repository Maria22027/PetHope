import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/styles/AdotarScreen.styles";
import { apiFetch } from "../utils/api";

const AdotarScreen = () => {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const data = await apiFetch('/pets');
      setPets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar pets:", error);
      setPets([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadPets();
  };

  const getStatusConfig = (status) => {
    const configs = {
      'adocao': {
        icon: 'heart',
        color: '#4CAF50',
        label: 'Adoção',
        style: styles.statusAdocao
      },
      'doacao-sangue': {
        icon: 'water',
        color: '#E53935',
        label: 'Doação de Sangue',
        style: styles.statusDoacaoSangue
      },
      'adocao-doacao-sangue': {
        icon: 'heart-circle',
        color: '#FF6F00',
        label: 'Adoção e Doação',
        style: styles.statusAdocaoDoacaoSangue
      },
      'indisponivel': {
        icon: 'close-circle',
        color: '#9E9E9E',
        label: 'Indisponível',
        style: styles.statusIndisponivel
      }
    };
    return configs[status] || configs['adocao'];
  };

  const renderPetCard = ({ item }) => {
    const statusConfig = getStatusConfig(item.status);
    
    return (
    <TouchableOpacity 
      style={styles.petCard}
      onPress={() => router.push(`/Screens/detalhesScreen?id=${item._id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="paw" size={60} color="#ccc" />
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.petName}>{item.nome}</Text>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="paw-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.especie}</Text>
          </View>
          {item.tipoSanguineo && (
            <View style={styles.detailItem}>
              <Ionicons name="water-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{item.tipoSanguineo}</Text>
            </View>
          )}
        </View>

        <View style={styles.detailRow}>
          {item.idade && (
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{item.idade} anos</Text>
            </View>
          )}
        </View>

        {item.descricao && (
          <View style={styles.detailRow}>
            <Text style={styles.detailText} numberOfLines={2}>{item.descricao}</Text>
          </View>
        )}

        {item.tutorId && item.tutorId.nome && (
          <View style={styles.locationRow}>
            <Ionicons name="person-outline" size={16} color="#E53935" />
            <Text style={styles.locationText}>{item.tutorId.nome}</Text>
          </View>
        )}

        {item.status && (
          <View style={[styles.statusBadge, statusConfig.style]}>
            <Ionicons name={statusConfig.icon} size={14} color="#fff" />
            <Text style={styles.statusText}>{statusConfig.label}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Carregando pets...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Adotar um Pet</Text>
        <Text style={styles.headerSubtitle}>
          {pets.length} {pets.length === 1 ? 'animal disponível' : 'animais disponíveis'}
        </Text>
      </View>

      <FlatList
        data={pets}
        renderItem={renderPetCard}
        keyExtractor={(item, index) => item._id?.toString() || `pet-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="paw-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum pet disponível no momento</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

export default AdotarScreen;