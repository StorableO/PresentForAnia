import React, { useState } from 'react';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';
import './QuoteManager.css';

const QuotesManager = ({ quotes, setQuotes}) => {
  const [newQuote, setNewQuote] = useState({ text: '', author: '' });
  const [message, setMessage] = useState('');

  const handleAddQuote = () => {
    if (newQuote.text.trim() && newQuote.author.trim()) {
      const quoteToAdd = {
        id: Date.now(),
        text: newQuote.text.trim(),
        author: newQuote.author.trim(),
        date: new Date().toLocaleDateString('ru-RU')
      };

      setQuotes([quoteToAdd, ...quotes]);
      setNewQuote({ text: '', author: '' });
      setMessage('Цитата добавлена!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleDeleteQuote = (id) => {
    setQuotes(quotes.filter(q => q.id !== id));
    setMessage('Цитата удалена!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <Container className="quotes-manager">
      <div className="manager-container">
      <div className="manager-header">
          <h2>Управление цитатами</h2>
        </div>

        {message && <Alert variant="success">{message}</Alert>}

        <div className="add-form">
          <h4>Добавить цитату</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Текст цитаты..."
                value={newQuote.text}
                onChange={(e) => setNewQuote({...newQuote, text: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Автор (например: От меня)"
                value={newQuote.author}
                onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
              />
            </Form.Group>

            <Button 
              variant="danger" 
              onClick={handleAddQuote}
              disabled={!newQuote.text.trim() || !newQuote.author.trim()}
              className="w-100"
            >
              Добавить цитату
            </Button>
          </Form>
        </div>
        <div className="quotes-list">
          <h4>Мои цитаты ({quotes.length})</h4>
          
          {quotes.length === 0 ? (
            <p className="text-muted">Пока нет цитат. Добавьте первую!</p>
          ) : (
            <div className="quotes-grid">
              {quotes.map((quote) => (
                <Card key={quote.id} className="quote-card">
                  <Card.Body>
                    <Card.Text className="quote-text">"{quote.text}"</Card.Text>
                    <div className="quote-footer">
                      <span className="quote-author">— {quote.author}</span>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteQuote(quote.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default QuotesManager;