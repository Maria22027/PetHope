import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../assets/styles/DoarScreen.styles";
import { apiFetch } from "../utils/api";

export default function DoarScreen() {
    const [donorCount, setDonorCount] = useState(0);

    useEffect(() => {
        loadDonorCount();
    }, []);

    const loadDonorCount = async () => {
        try {
            const pets = await apiFetch('/pets');
            // Filtra pets com status de doação de sangue
            // Status possíveis: "adocao", "doacao-sangue", "adocao-doacao-sangue", "indisponivel"
            const donors = pets.filter(pet => 
                pet.status && (
                    pet.status === 'doacao-sangue' || 
                    pet.status === 'adocao-doacao-sangue'
                )
            );
            setDonorCount(donors.length);
        } catch (error) {
            console.error("Erro ao carregar contador de doadores:", error);
        }
    };

    const handleRegisterPet = () => {
        // Redireciona para WhatsApp (substitua pelo número desejado)
        const phoneNumber = '5511999999999'; // Ajuste o número
        const message = 'Olá! Gostaria de cadastrar meu pet para doação de sangue';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        Linking.openURL(url).catch(err => {
            console.error("Erro ao abrir WhatsApp:", err);
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Informações sobre <Text style={styles.bold}>doação de sangue</Text></Text>

            {/* Linha Divisória */}
            <View style={styles.divider} />

            {/* Por que doar */}
            <Text style={styles.sectionTitle}>Por que doar?</Text>
            <Text style={styles.text}>
                Assim como os seres humanos, os animais também podem precisar de transfusões de sangue em situações de emergências,
                como acidentes, cirurgias, doenças graves ou problemas crônicos. A doação de sangue animal é um ato de solidariedade
                que pode ajudar a salvar a vida de muitos pets e animais de grande porte.
            </Text>

            {/* Quem pode ser doador */}
            <Text style={styles.sectionTitle}>Quem pode ser doador?</Text>
            <Text style={styles.text}>
                As regras podem variar de acordo com a espécie, mas geralmente os doadores devem ser saudáveis, vacinados e bem nutridos:
            </Text>

            <Text style={styles.list}>• Cães entre 1 e 8 anos, acima de 25kg.</Text>
            <Text style={styles.list}>• Gatos entre 1 e 8 anos, acima de 4kg.</Text>
            <Text style={styles.list}>• Vacinação e vermifugação atualizadas.</Text>
            <Text style={styles.list}>• Animais dóceis, que aceitam manipulação.</Text>
            <Text style={styles.list}>• Não podem estar gestantes ou lactantes.</Text>
            <Text style={styles.list}>• Devem estar livres de doenças infectocontagiosas.</Text>
            <Text style={styles.list}>• Exames clínicos e laboratoriais atualizados.</Text>

            <Text style={styles.text}>
                Cada clínica veterinária possui critérios específicos, especialmente suspensões de medicações veterinárias especializadas.
            </Text>

            {/* Etapas da doação */}
            <Text style={styles.sectionTitle}>Etapas da doação</Text>
            <Text style={styles.list}>1. Cadastro: O tutor ou responsável preenche informações sobre o animal.</Text>
            <Text style={styles.list}>2. Avaliação: Exame clínico e de saúde para garantir que o animal está apto.</Text>
            <Text style={styles.list}>3. Doação: O procedimento é seguro e feito com total cuidado. Em cães dura cerca de 20 a 30 minutos.
                Em gatos é um pouco mais rápido, e nos equinos leva um pouco mais de tempo.</Text>
            <Text style={styles.list}>4. Recuperação: Processo rápido, o animal pode voltar para casa no mesmo dia.</Text>

            {/* Benefícios */}
            <Text style={styles.sectionTitle}>Benefícios para o doador</Text>
            <Text style={styles.list}>• Exames gratuitos e acompanhamento veterinário a cada doação.</Text>
            <Text style={styles.list}>• Contribuição direta para salvar a vida de outros animais.</Text>
            <Text style={styles.list}>• Fortalecimento do vínculo entre tutor e pet; seu animal se torna um verdadeiro herói!</Text>

            {/* Frequência */}
            <Text style={styles.sectionTitle}>Com que frequência doar?</Text>
            <Text style={styles.list}>• Cães: a cada 3 meses.</Text>
            <Text style={styles.list}>• Gatos: entre 4 e 6 meses, dependendo da avaliação veterinária.</Text>
            <Text style={styles.list}>• Equinos e animais rurais: em situações especiais.</Text>
            <Text style={styles.text}>
                Sempre respeite os limites fisiológicos da espécie e siga a orientação de profissionais qualificados.
            </Text>

            {/* Como participar */}
            <Text style={styles.sectionTitle}>Como participar?</Text>
            <Text style={styles.text}>
                Seu pet cumpre os requisitos? Cadastre clicando no botão abaixo.
            </Text>

            {/* Contador de Animais Doadores */}
            <View style={styles.counterContainer}>
                <Ionicons name="heart" size={40} color="#E53935" />
                <View style={styles.counterTextContainer}>
                    <Text style={styles.counterNumber}>{donorCount}</Text>
                    <Text style={styles.counterLabel}>
                        {donorCount === 1 ? 'Animal cadastrado' : 'Animais cadastrados'}
                    </Text>
                    <Text style={styles.counterSubLabel}>para doação de sangue</Text>
                </View>
            </View>

            {/* Botão Cadastrar Meu Pet */}
            <TouchableOpacity style={styles.redBtn} onPress={handleRegisterPet}>
                <Ionicons name="add-circle" size={20} color="#fff" />
                <Text style={styles.btnText}>Cadastrar Meu Pet</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}