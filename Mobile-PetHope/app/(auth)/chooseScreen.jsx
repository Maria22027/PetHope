import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Choose() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a nova tela unificada de cadastro
    router.replace("/(auth)/signUp");
  }, []);

  // Mostrar loading enquanto redireciona
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <ActivityIndicator size="large" color="#E53935" />
    </View>
  );
}