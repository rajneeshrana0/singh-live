const Party = require('../models/Party');

// Controller methods
const partyController = {
  getAllParties: async (req, res) => {
    try {
      const parties = await Party.find();
      res.json(parties);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getPartyById: async (req, res) => {
    try {
      const party = await Party.findById(req.params.id);
      if (party == null) {
        return res.status(404).json({ message: 'Party not found' });
      }
      res.json(party);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addParty: async (req, res) => {
    const party = new Party({
      name: req.body.name,
      description: req.body.description
    });
    try {
      const newParty = await party.save();
      res.status(201).json(newParty);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateParty: async (req, res) => {
    try {
      const party = await Party.findById(req.params.id);
      if (party == null) {
        return res.status(404).json({ message: 'Party not found' });
      }
      if (req.body.name != null) {
        party.name = req.body.name;
      }
      if (req.body.description != null) {
        party.description = req.body.description;
      }
      const updatedParty = await party.save();
      res.json(updatedParty);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteParty: async (req, res) => {
    try {
      const party = await Party.findById(req.params.id);
      if (party == null) {
        return res.status(404).json({ message: 'Party not found' });
      }
      await party.remove();
      res.json({ message: 'Party deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = partyController;
