const express = require('express');
const router = express.Router();
const QuoteController = require('./QuoteController');

const quoteController = new QuoteController();

router.get('/', quoteController.getAll);
router.post('/', quoteController.create);
router.get('/:id', quoteController.getById);
router.delete('/:id', quoteController.delete);
router.patch('/:id/like', quoteController.like);

module.exports = router;