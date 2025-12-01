const Historico = require("../models/History");

module.exports = {
  async create(req, res) {
    try {
      const hist = await Historico.create(req.body);
      res.status(201).json(hist);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async listByPet(req, res) {
    const historicos = await Historico.find({ petId: req.params.id })
                     .populate("usuarioId", "nome tipo")
                     .populate("petId", "nome especie");
    res.json(historicos);
  },

  async listByUser(req, res) {
    try {
      const historicos = await Historico.find({ usuarioId: req.params.id })
                       .populate("usuarioId", "nome tipo email")
                       .populate("petId", "nome especie");
      res.json(historicos);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async listAll(req, res) {
    try {
      const historicos = await Historico.find()
                       .populate("usuarioId", "nome tipo email")
                       .populate("petId", "nome especie");
      res.json(historicos);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
