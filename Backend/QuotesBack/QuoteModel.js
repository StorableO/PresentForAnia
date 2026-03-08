const { text } = require('express')
const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500
    },
    author: {
        type: String,
        default: 'unknown',
        maxlength: 100
    },
    category: {
        type: String,
        default: 'general',
        enum: ['general', 'inspirational', 'funny', 'philosophy', 'love', 'life'],
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        default: 'Ania'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

class Quote{
    static async getAll(filter = {}, options = {}){
        try{
            const {sortBy = 'createdAt',
                   sortOrder = 'desc',
                   limit = 100
             } = options;
            const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1}

            const quotes = await mongoose.model('Quote')
                .find(filter)
                .sort(sort)
                .limit(limit);
            return {quotes};
    }catch(error){
        throw new Error('quotes are not getted');
    }
    }
     static async getById(id) {
        try {
            const quote = await mongoose.model('Quote').findById(id);
            
            if (!quote) {
                throw new Error('not found');
            }
            
            return quote;
        } catch (error) {
            throw new Error(`error while finding`);
        }
    }
    static async create(quoteData) {
        try {
            // this.validateQuoteData(quoteData);

            const QuoteModel = mongoose.model('Quote');
            const quote = new QuoteModel({
                text: quoteData.text,
                author: quoteData.author,
                category: quoteData.categor,
                createdBy: quoteData.createdBy
            });

            const savedQuote = await quote.save();
            return savedQuote.toObject();
        } catch (error) {
            throw new Error('Error while creating');
        }
    }
    static async delete(id) {
        try {
            const deletedQuote = await mongoose.model('Quote')
                .findByIdAndDelete(id)

            if (!deletedQuote) {
                throw new Error('quote not found');
            }

            return { 
                message: 'Deleted',
                deletedQuote 
            };
        } catch (error) {
            throw new Error('Error while deleting');
        }
    }
    static async like(id) {
        try {
            const quote = await mongoose.model('Quote')
                .findByIdAndUpdate(
                    id,
                    { $inc: { likes: 1 } }
                )

            if (!quote) {
                throw new Error('quote not found');
            }

            return quote;
        } catch (error) {
            throw new Error('Error while liking');
        }
    }
     static formatForOutput(quote) {
        return {
            id: quote._id,
            text: quote.text,
            author: quote.author,
            category: quote.category,
            likes: quote.likes,
            createdAt: quote.createdAt
        };
    }
}

quoteSchema.loadClass(Quote);

const QuoteModel = mongoose.model('Quote', quoteSchema);

module.exports = QuoteModel;

