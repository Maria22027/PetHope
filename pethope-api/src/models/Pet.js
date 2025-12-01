const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especie: { type: String, required: true }, // cachorro, gato...
  idade: Number,
  tipoSanguineo: String,
  status: { type: String, enum: ["adocao", "doacao-sangue", "adocao-doacao-sangue", "indisponivel"], default: "adocao" },

  descricao: String,
  imageUrl: { type: String }, // URL da imagem de API pública

  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
});

module.exports = mongoose.model("Pet", PetSchema);
