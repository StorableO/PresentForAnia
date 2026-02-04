import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Gallery.css';

const Gallery = ({images, setImages}) => {
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });

  const handleAddImage = () => {
    if (newImage.url && newImage.caption) {
      const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
      setImages([...images, { id: newId, url: newImage.url, caption: newImage.caption }]);
      setNewImage({ url: '', caption: '' });
      setShowModal(false);
      console.log(images);
    }
  };

  const handleRemoveImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  };

  return (
    <section className="gallery">
      <Container>
        <motion.h2 
          className="gallery-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Наша галерея
        </motion.h2>
        
        <motion.p 
          className="gallery-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Здесь хранятся наши самые теплые моменты
        </motion.p>
        
        <motion.div 
          className="text-center mb-5"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <Button 
            variant="danger" 
            size="lg"
            onClick={() => setShowModal(true)}
            className="add-photo-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Добавить наше фото
          </Button>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row>
            {images?.map((image, index) => (
              <Col key={image.id} md={6} lg={4} className="mb-4">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="gallery-card">
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
                    <Card.Footer className="d-flex justify-content-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleRemoveImage(image.id)}
                          className="remove-btn"
                        >
                          Удалить
                        </Button>
                      </motion.div>
                    </Card.Footer>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
        
        {images.length === 0 && (
          <motion.div 
            className="empty-gallery text-center py-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-muted">Пока здесь нет фото</h4>
            <p>Добавьте первое фото, чтобы начать галерею</p>
          </motion.div>
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
                Вы можете загрузить фото на сервисы и вставить ссылку
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Описание фото</Form.Label>
              <Form.Control
                type="text"
                placeholder="Описание"
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