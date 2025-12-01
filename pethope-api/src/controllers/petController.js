const Pet = require("../models/Pet");
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require("../services/uploadService");

module.exports = {
  async create(req, res) {
    try {
      console.log('=== CREATE PET ===');
      console.log('Body keys:', Object.keys(req.body));
      console.log('imageUrl presente?', !!req.body.imageUrl);
      console.log('imageUrl tipo:', typeof req.body.imageUrl);
      console.log('imageUrl começa com data:image?', req.body.imageUrl?.startsWith('data:image'));
      
      // Garante que só desktop pode cadastrar (tipo clinica)
      if (!req.user || req.user.tipo !== "clinica") {
        return res.status(403).json({ error: "Apenas clínicas podem cadastrar pets." });
      }

      const petData = { ...req.body, tutorId: req.user.id };

      // Se houver imagem Base64, tentar fazer upload no Cloudinary
      if (req.body.imageUrl && req.body.imageUrl.startsWith('data:image')) {
        try {
          console.log('Tentando fazer upload da imagem no Cloudinary...');
          const cloudinaryUrl = await uploadImageToCloudinary(req.body.imageUrl, 'pets');
          petData.imageUrl = cloudinaryUrl;
          console.log('✅ Upload concluído no Cloudinary:', cloudinaryUrl);
        } catch (uploadError) {
          console.error('⚠️ Falha no Cloudinary, salvando Base64 no banco:', uploadError.message);
          // Fallback: salvar Base64 diretamente no banco
          petData.imageUrl = req.body.imageUrl;
        }
      }

      const pet = await Pet.create(petData);
      console.log('Pet criado com sucesso:', pet.nome, pet.imageUrl ? '(com imagem)' : '(sem imagem)');
      return res.status(201).json(pet);
    } catch (error) {
      console.error('Erro ao criar pet:', error);
      return res.status(500).json({ error: error.message || 'Erro ao criar pet' });
    }
  },

  async list(req, res) {
    const pets = await Pet.find().populate("tutorId", "nome tipo");
    res.json(pets);
  },

  async getById(req, res) {
    const pet = await Pet.findById(req.params.id).populate("tutorId");
    res.json(pet);
  },

  async update(req, res) {
    try {
      const petData = { ...req.body };

      // Se houver nova imagem Base64, tentar fazer upload no Cloudinary
      if (req.body.imageUrl && req.body.imageUrl.startsWith('data:image')) {
        try {
          console.log('Tentando fazer upload da nova imagem...');
          // Buscar pet antigo para deletar imagem antiga do Cloudinary
          const oldPet = await Pet.findById(req.params.id);
          if (oldPet && oldPet.imageUrl && oldPet.imageUrl.includes('cloudinary.com')) {
            await deleteImageFromCloudinary(oldPet.imageUrl);
          }

          // Upload nova imagem
          const cloudinaryUrl = await uploadImageToCloudinary(req.body.imageUrl, 'pets');
          petData.imageUrl = cloudinaryUrl;
          console.log('✅ Upload concluído:', cloudinaryUrl);
        } catch (uploadError) {
          console.error('⚠️ Falha no Cloudinary, salvando Base64 no banco:', uploadError.message);
          // Fallback: salvar Base64 diretamente no banco
          petData.imageUrl = req.body.imageUrl;
        }
      }

      const pet = await Pet.findByIdAndUpdate(req.params.id, petData, { new: true });
      res.json(pet);
    } catch (error) {
      console.error('Erro ao atualizar pet:', error);
      res.status(500).json({ error: error.message || 'Erro ao atualizar pet' });
    }
  },

  async remove(req, res) {
    try {
      // Buscar pet para deletar imagem do Cloudinary
      const pet = await Pet.findById(req.params.id);
      if (pet && pet.imageUrl) {
        await deleteImageFromCloudinary(pet.imageUrl);
      }

      await Pet.findByIdAndDelete(req.params.id);
      res.json({ message: "Pet removido com sucesso" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
