import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/styles/DetalhesCampanhaScreen.styles";
import { apiFetch } from "../utils/api";

export default function DetalhesCampanhaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const campanhaId = params.id;
  
  const [campanha, setCampanha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampanha();
  }, [campanhaId]);

  const loadCampanha = async () => {
    try {
      const data = await apiFetch(`/campaigns/${campanhaId}`);
      setCampanha(data);
    } catch (error) {
      console.error("Erro ao carregar campanha:", error);
      Alert.alert("Erro", "Não foi possível carregar os detalhes da campanha");
    } finally {
      setLoading(false);
    }
  };

  const handleParticipate = () => {
    if (campanha?.link) {
      Linking.openURL(campanha.link).catch(err => {
        console.error("Erro ao abrir link:", err);
        Alert.alert("Erro", "Não foi possível abrir o link");
      });
    } else {
      // Fallback para WhatsApp se não houver link
      const phoneNumber = '5511999999999'; // Ajuste o número
      const message = `Olá! Gostaria de participar da campanha: ${campanha?.titulo}`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      Linking.openURL(url).catch(err => {
        console.error("Erro ao abrir WhatsApp:", err);
        Alert.alert("Erro", "Não foi possível abrir o WhatsApp");
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!campanha) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Campanha não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Imagem da Campanha */}
        <View style={styles.imageContainer}>
          {campanha.imageUrl ? (
            <Image 
              source={{ uri: campanha.imageUrl }} 
              style={styles.campanhaImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="megaphone" size={80} color="#fff" />
            </View>
          )}
        </View>

        {/* Informações da Campanha */}
        <View style={styles.infoContainer}>
          <Text style={styles.campanhaNome}>{campanha.titulo}</Text>
          
          {campanha.organizacaoId && (
            <View style={styles.organizationRow}>
              <Ionicons name="business-outline" size={20} color="#666" />
              <Text style={styles.organizationText}>
                {campanha.organizacaoId.nome || campanha.organizacaoId.nomeOrganizacao || "Organização"}
              </Text>
            </View>
          )}

          {campanha.data && (
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.detailText}>{new Date(campanha.data).toLocaleDateString()}</Text>
            </View>
          )}

          {campanha.descricao && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Sobre a campanha</Text>
              <Text style={styles.descriptionText}>{campanha.descricao}</Text>
            </View>
          )}

          {/* Botão Participar */}
          <TouchableOpacity style={styles.participateButton} onPress={handleParticipate}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            <Text style={styles.participateButtonText}>Participar da Campanha</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
