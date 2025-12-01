const mongoose = require("mongoose");

const CampanhaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  data: Date,

  organizacaoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
});

module.exports = mongoose.model("Campanha", CampanhaSchema);
