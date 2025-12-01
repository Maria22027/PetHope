const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary com variáveis de ambiente
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Faz upload de uma imagem Base64 para o Cloudinary
 * @param {string} base64Image - String Base64 da imagem (data:image/jpeg;base64,...)
 * @param {string} folder - Pasta no Cloudinary (ex: 'pets', 'campaigns')
 * @returns {Promise<string>} URL pública da imagem no Cloudinary
 */
async function uploadImageToCloudinary(base64Image, folder = 'pets') {
    try {
        // Validar se é Base64
        if (!base64Image || !base64Image.startsWith('data:image')) {
            console.log('Imagem não é Base64, ignorando upload');
            throw new Error('Formato de imagem inválido. Esperado Base64.');
        }

        console.log('Iniciando upload no Cloudinary...');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('Tamanho da imagem Base64:', base64Image.length, 'caracteres');

        // Upload para o Cloudinary
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: folder,
            resource_type: 'image',
            transformation: [
                { width: 800, height: 800, crop: 'limit' }, // Limitar tamanho máximo
                { quality: 'auto' } // Otimização automática
            ]
        });

        console.log('✅ Upload concluído com sucesso!');
        console.log('URL da imagem:', result.secure_url);
        return result.secure_url; // Retorna URL segura (HTTPS)
    } catch (error) {
        console.error('❌ Erro detalhado no Cloudinary:', error.message);
        console.error('Stack:', error.stack);
        throw error;
    }
}

/**
 * Deleta uma imagem do Cloudinary
 * @param {string} imageUrl - URL da imagem no Cloudinary
 */
async function deleteImageFromCloudinary(imageUrl) {
    try {
        if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
            return; // Não é imagem do Cloudinary, ignora
        }

        // Extrair public_id da URL
        const parts = imageUrl.split('/');
        const filename = parts[parts.length - 1].split('.')[0];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${filename}`;

        await cloudinary.uploader.destroy(publicId);
        console.log('Imagem deletada do Cloudinary:', publicId);
    } catch (error) {
        console.error('Erro ao deletar imagem do Cloudinary:', error);
    }
}

module.exports = {
    uploadImageToCloudinary,
    deleteImageFromCloudinary
};
