import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { cardService } from '../services/cardService';

const CardForm = ({ card, onCardCreated, onCardUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    cardType: '',
    expiryDate: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const cardTypes = ['Credit', 'Debit', 'Prepaid', 'Gift', 'Business'];

  useEffect(() => {
    if (card) {
      // Format the date for the datetime-local input
      const expiryDate = card.expiryDate ? 
        new Date(card.expiryDate).toISOString().slice(0, 16) : '';
      
      setFormData({
        cardNumber: card.cardNumber || '',
        cardHolderName: card.cardHolderName || '',
        cardType: card.cardType || '',
        expiryDate: expiryDate,
        isActive: card.isActive !== undefined ? card.isActive : true
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }

    if (!formData.cardType) {
      newErrors.cardType = 'Card type is required';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.expiryDate = 'Expiry date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const cardData = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ''), // Remove spaces
        expiryDate: new Date(formData.expiryDate).toISOString()
      };

      if (card) {
        // Update existing card
        const response = await cardService.updateCard(card.id, cardData);
        onCardUpdated(response.data);
      } else {
        // Create new card
        const response = await cardService.createCard(cardData);
        onCardCreated(response.data);
      }

      // Reset form
      setFormData({
        cardNumber: '',
        cardHolderName: '',
        cardType: '',
        expiryDate: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error saving card:', error);
      setSubmitError(
        error.response?.data?.message || 
        'Failed to save card. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setFormData(prev => ({
        ...prev,
        cardNumber: formatted
      }));
    }
  };

  return (
    <div className="form-container">
      <Card>
        <Card.Header>
          <h3>{card ? 'Edit Card' : 'Add New Card'}</h3>
        </Card.Header>
        <Card.Body>
          {submitError && (
            <Alert variant="danger" className="mb-3">
              {submitError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                isInvalid={!!errors.cardNumber}
                maxLength="19" // 16 digits + 3 spaces
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Holder Name</Form.Label>
              <Form.Control
                type="text"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                placeholder="John Doe"
                isInvalid={!!errors.cardHolderName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardHolderName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Type</Form.Label>
              <Form.Select
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                isInvalid={!!errors.cardType}
              >
                <option value="">Select card type</option>
                {cardTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.cardType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                isInvalid={!!errors.expiryDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiryDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Active"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : (card ? 'Update Card' : 'Add Card')}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardForm;