const express = require('express');
const router = express.Router();
const partyController = require('../controller/PartyController');

// GET all parties
router.get('/', partyController.getAllParties);

// GET a party by ID
router.get('/:id', partyController.getPartyById);

// POST create a new party
router.post('/', partyController.addParty);

// PUT update a party
router.put('/:id', partyController.updateParty);

// DELETE a party
router.delete('/:id', partyController.deleteParty);

module.exports = router;
