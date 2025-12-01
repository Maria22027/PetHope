// Arquivo temporário para testar limpeza de storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function clearAllStorage() {
  try {
    await AsyncStorage.clear();
    console.log('All storage cleared!');
  } catch (e) {
    console.error('Failed to clear storage', e);
  }
}
