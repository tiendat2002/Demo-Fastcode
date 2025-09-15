import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cardService = {
  // Get all cards
  getAllCards: () => api.get('/cards'),
  
  // Get card by ID
  getCardById: (id) => api.get(`/cards/${id}`),
  
  // Get card by number
  getCardByNumber: (cardNumber) => api.get(`/cards/number/${cardNumber}`),
  
  // Get cards by holder name
  getCardsByHolderName: (holderName) => api.get(`/cards/holder/${holderName}`),
  
  // Get cards by type
  getCardsByType: (cardType) => api.get(`/cards/type/${cardType}`),
  
  // Get active cards
  getActiveCards: () => api.get('/cards/active'),
  
  // Get all card types
  getAllCardTypes: () => api.get('/cards/types'),
  
  // Create new card
  createCard: (cardData) => api.post('/cards', cardData),
  
  // Update card
  updateCard: (id, cardData) => api.put(`/cards/${id}`, cardData),
  
  // Delete card
  deleteCard: (id) => api.delete(`/cards/${id}`),
  
  // Deactivate card
  deactivateCard: (id) => api.patch(`/cards/${id}/deactivate`),
};

export default api;