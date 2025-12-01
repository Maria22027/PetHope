// Arquivo de configuração - config.js
// Coloque este arquivo em src/config.js se precisar de variáveis de ambiente

module.exports = {
    // URL da API - modifique conforme necessário
    API_BASE_URL: process.env.REACT_APP_API_URL || 'https://pethope-aw8q.onrender.com',
    
    // Configurações de timeout
    API_TIMEOUT: 10000,
    
    // Configurações de armazenamento
    STORAGE_KEY_TOKEN: 'pethope_token',
    STORAGE_KEY_USER: 'pethope_user',
    
    // Tipos de usuário disponíveis
    USER_TYPES: {
        TUTOR: 'tutor',
        ONG: 'ong',
        CLINICA: 'clinica'
    }
};
