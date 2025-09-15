import React from 'react';
import { Card, Button, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { cardService } from '../services/cardService';

const CardList = ({ cards, loading, onEdit, onDelete, onRefresh }) => {
  const handleDelete = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await cardService.deleteCard(cardId);
        onDelete(cardId);
      } catch (error) {
        console.error('Error deleting card:', error);
        alert('Failed to delete card');
      }
    }
  };

  const handleDeactivate = async (cardId) => {
    if (window.confirm('Are you sure you want to deactivate this card?')) {
      try {
        await cardService.deactivateCard(cardId);
        onRefresh();
      } catch (error) {
        console.error('Error deactivating card:', error);
        alert('Failed to deactivate card');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <h3>No cards found</h3>
        <p>Start by adding your first card to the portal.</p>
        <Button variant="primary" onClick={onRefresh}>
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cards ({cards.length})</h2>
        <Button variant="outline-primary" onClick={onRefresh}>
          Refresh
        </Button>
      </div>

      <Row>
        {cards.map((card) => (
          <Col md={6} lg={4} key={card.id} className="mb-4">
            <Card className="card-item h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="mb-0">{card.cardHolderName}</Card.Title>
                  <Badge 
                    bg={card.isActive ? 'success' : 'secondary'}
                    className="ms-2"
                  >
                    {card.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <Card.Text>
                  <strong>Card Number:</strong> ****{card.cardNumber.slice(-4)}<br/>
                  <strong>Type:</strong> {card.cardType}<br/>
                  <strong>Expires:</strong> {formatDate(card.expiryDate)}<br/>
                  <strong>Created:</strong> {formatDate(card.createdAt)}
                </Card.Text>

                <div className="card-actions">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(card)}
                  >
                    Edit
                  </Button>
                  {card.isActive && (
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleDeactivate(card.id)}
                    >
                      Deactivate
                    </Button>
                  )}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(card.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardList;