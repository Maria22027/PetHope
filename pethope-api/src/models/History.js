const mongoose = require("mongoose");

const HistoricoSchema = new mongoose.Schema({
  tipoEvento: { type: String, required: true }, 
  descricao: String,
  data: { type: Date, default: Date.now },

  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet"
  }
});

module.exports = mongoose.model("Historico", HistoricoSchema);
