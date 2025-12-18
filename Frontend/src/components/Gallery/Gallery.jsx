import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { motion, spring } from 'framer-motion';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([
    { id: 1, url: 'https://aif-s3.aif.ru/images/019/507/eeba36a2a2d37754bab8b462f4262d97.jpg', caption: 'Наше первое фото' },
    { id: 2, url: 'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80', caption: 'Закат вместе' },
    { id: 3, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w-600&q=80', caption: 'Твой прекрасный взгляд' },
    { id: 4, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80', caption: 'Улыбка, которая согревает' },
    { id: 5, url: 'https://images.unsplash.com/photo-1494790108755-2616c113a1c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80', caption: 'Наше путешествие' },
    { id: 6, url: 'https://images.unsplash.com/photo-1523264939339-c89f9dadde2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80', caption: 'Прогулка под дождем' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });

  const handleAddImage = () => {
    if (newImage.url && newImage.caption) {
      const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
      setImages([...images, { id: newId, url: newImage.url, caption: newImage.caption }]);
      setNewImage({ url: '', caption: '' });
      setShowModal(false);
       console.log(images)
    }
  };

  const handleRemoveImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };
 
  return (
    <section className="gallery">
      <Container>
        <h2 className="gallery-title">Наша галерея</h2>
        <p className="gallery-subtitle">Здесь хранятся наши самые теплые моменты</p>
        
        <div className="text-center mb-5">
          <Button 
            variant="danger" 
            size="lg"
            onClick={() => setShowModal(true)}
            className="add-photo-btn"
          >
            + Добавить наше фото
          </Button>
        </div>
        
        <Row>
          {images?.map((image, index) => (
            <Col key={image.id} md={6} lg={4} className="mb-4">
              <motion
                defaultStyle={{ opacity: 0, scale: 0.8 }}
                style={{
                  opacity: spring(1, { stiffness: 100, damping: 10 }),
                  scale: spring(1, { stiffness: 100, damping: 10 })
                }}
              >
                {style => (
                  <Card 
                    className="gallery-card"
                    style={{
                      opacity: style.opacity,
                      transform: `scale(${style.scale})`
                    }}
                  >
                    <div className="image-container">
                      <Card.Img 
                        variant="top" 
                        src={image.url} 
                        alt={image.caption}
                      />
                    </div>
                    <Card.Body>
                      <Card.Text className="image-caption">{image.caption}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleRemoveImage(image.id)}
                        className="remove-btn"
                      >
                        Удалить
                      </Button>
                    </Card.Footer>
                  </Card>
                )}
              </motion>
            </Col>
          ))}
        </Row>
        
        {images.length === 0 && (
          <div className="empty-gallery text-center py-5">
            <h4 className="text-muted">Пока здесь нет фото</h4>
            <p>Добавьте первое фото, чтобы начать галерею</p>
          </div>
        )}
      </Container>
      
      <Modal show={showModal} onHide={() => setShowModal(false)} className="gallery-modal">
        <Modal.Header closeButton>
          <Modal.Title>Добавить наше фото</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>URL изображения</Form.Label>
              <Form.Control
                type="text"
                placeholder="Вставьте ссылку на фото"
                value={newImage.url}
                onChange={(e) => setNewImage({...newImage, url: e.target.value})}
              />
              <Form.Text className="text-muted">
                Вы можете загрузить фото на сервисы вроде Imgur и вставить ссылку
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Описание фото</Form.Label>
              <Form.Control
                type="text"
                placeholder="Например: Наша поездка на море"
                value={newImage.caption}
                onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleAddImage}>
            Добавить фото
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Gallery;