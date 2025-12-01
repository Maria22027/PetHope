import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/styles/DetalhesScreen.styles";
import { apiFetch } from "../utils/api";

export default function DetalhesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const petId = params.id;
  
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPet();
  }, [petId]);

  const loadPet = async () => {
    try {
      const data = await apiFetch(`/pets/${petId}`);
      setPet(data);
    } catch (error) {
      console.error("Erro ao carregar pet:", error);
      Alert.alert("Erro", "Não foi possível carregar os detalhes do pet");
    } finally {
      setLoading(false);
    }
  };

  const handleAdoption = async () => {
    try {
      // Remove o pet do banco
      await apiFetch(`/pets/${petId}`, {
        method: 'DELETE'
      });

      // Redireciona para WhatsApp (substitua pelo número desejado)
      const phoneNumber = '5511999999999'; // Ajuste o número
      const message = `Olá! Gostaria de adotar o pet ${pet?.nome}`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      await Linking.openURL(url);
      
      // Volta para tela anterior
      router.back();
    } catch (error) {
      console.error("Erro ao solicitar adoção:", error);
      Alert.alert("Erro", "Não foi possível processar a solicitação");
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

  if (!pet) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Pet não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        {/* Imagem do Pet */}
        <View style={styles.imageContainer}>
          {pet.imageUrl ? (
            <Image 
              source={{ uri: pet.imageUrl }} 
              style={styles.petImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="paw" size={80} color="#ccc" />
            </View>
          )}
        </View>

        {/* Informações do Pet */}
        <View style={styles.infoContainer}>
          <Text style={styles.petName}>{pet.nome}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Espécie</Text>
              <Text style={styles.infoValue}>{pet.especie}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Idade</Text>
              <Text style={styles.infoValue}>{pet.idade ? `${pet.idade} anos` : "Não informado"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tipo Sanguíneo</Text>
              <Text style={styles.infoValue}>{pet.tipoSanguineo || "Não informado"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{pet.status || "Não informado"}</Text>
            </View>
          </View>

          {pet.tutorId && (
            <View style={styles.fullWidthInfo}>
              <Text style={styles.infoLabel}>Responsável</Text>
              <Text style={styles.infoValue}>{pet.tutorId.nome || "Não informado"}</Text>
              {pet.tutorId.tipo && (
                <Text style={styles.infoValue}>Tipo: {pet.tutorId.tipo}</Text>
              )}
            </View>
          )}

          {pet.descricao && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.infoLabel}>Descrição</Text>
              <Text style={styles.descriptionText}>{pet.descricao}</Text>
            </View>
          )}

          {/* Botão Solicitar Adoção */}
          <TouchableOpacity style={styles.adoptButton} onPress={handleAdoption}>
            <Ionicons name="heart" size={24} color="#fff" />
            <Text style={styles.adoptButtonText}>Solicitar Adoção</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
