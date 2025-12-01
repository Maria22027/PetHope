const Campanha = require("../models/Campaign");

module.exports = {
  async create(req, res) {
    try {
      // Garante que só desktop pode cadastrar (tipo ong ou clinica)
      if (!req.user || (req.user.tipo !== "ong" && req.user.tipo !== "clinica")) {
        return res.status(403).json({ error: "Apenas ONGs ou clínicas podem cadastrar campanhas." });
      }
      const camp = await Campanha.create({ ...req.body, organizacaoId: req.user.id });
      return res.status(201).json(camp);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async list(req, res) {
    const camps = await Campanha.find().populate("organizacaoId", "nome tipo");
    res.json(camps);
  },

  async getById(req, res) {
    try {
      const campanha = await Campanha.findById(req.params.id).populate("organizacaoId");
      if (!campanha) {
        return res.status(404).json({ error: 'Campanha não encontrada' });
      }
      res.json(campanha);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar campanha' });
    }
  },

  async update(req, res) {
    try {
      const campanha = await Campanha.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!campanha) {
        return res.status(404).json({ error: 'Campanha não encontrada' });
      }
      res.json(campanha);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar campanha' });
    }
  },

  async remove(req, res) {
    try {
      const campanha = await Campanha.findByIdAndDelete(req.params.id);
      if (!campanha) {
        return res.status(404).json({ error: 'Campanha não encontrada' });
      }
      res.json({ message: 'Campanha removida com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover campanha' });
    }
  }
};
