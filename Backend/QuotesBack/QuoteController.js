const Quote = require('./QuoteModel');

 class QuoteController {
    // GET /api/quotes
     async getAll(req, res) {
        try {
            const { category, author, limit, sortBy } = req.query;
            
            const filter = {};
            // if (category) filter.category = category;
            // if (author) filter.author = new RegExp(author, 'i');

            const result = await Quote.getAll(filter, {limit, sortBy});

const formattedQuotes = result.quotes.map(quote => Quote.formatForOutput(quote));

            res.json({
                success: true,
                data: formattedQuotes
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/quotes/:id
    async getById(req, res) {
        try {
            const quote = await Quote.getById(req.params.id);
            
            res.json({
                success: true,
                data: Quote.formatForOutput(quote)
            });
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : 400;
            res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    // POST /api/quotes
    async create(req, res) {
        try {
            const quote = await Quote.create({
                text: req.body.text,
                author: req.body.author,
                category: req.body.category,
                createdBy: req.user?.id || 'Ania'
            });

            res.status(201).json({
                success: true,
                message: 'quote created',
                data: Quote.formatForOutput(quote)
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }


    // DELETE /api/quotes/:id
    async delete(req, res) {
        try {
            const result = await Quote.delete(req.params.id);
            
            res.json({
                success: true,
                message: result.message
            });
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : 400;
            res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    // PATCH /api/quotes/:id/like
    async like(req, res) {
        try {
            const quote = await Quote.like(req.params.id);
            
            res.json({
                success: true,
                message: 'qoute got like',
                data: { likes: quote.likes }
            });
        } catch (error) {
            const status = error.message.includes('not found') ? 404 : 400;
            res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = QuoteController;