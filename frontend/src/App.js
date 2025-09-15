import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CardList from './components/CardList';
import CardForm from './components/CardForm';
import { cardService } from './services/cardService';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('list');
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await cardService.getAllCards();
      setCards(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cards. Please make sure the backend server is running.');
      console.error('Error fetching cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardCreated = (newCard) => {
    setCards([...cards, newCard]);
    setActiveView('list');
  };

  const handleCardUpdated = (updatedCard) => {
    setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
    setEditingCard(null);
    setActiveView('list');
  };

  const handleCardDeleted = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setActiveView('form');
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    setActiveView('list');
  };

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Card Portal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link 
              active={activeView === 'list'} 
              onClick={() => {
                setActiveView('list');
                setEditingCard(null);
              }}
            >
              All Cards
            </Nav.Link>
            <Nav.Link 
              active={activeView === 'form'} 
              onClick={() => {
                setActiveView('form');
                setEditingCard(null);
              }}
            >
              Add Card
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {activeView === 'list' && (
          <CardList
            cards={cards}
            loading={loading}
            onEdit={handleEditCard}
            onDelete={handleCardDeleted}
            onRefresh={fetchCards}
          />
        )}

        {activeView === 'form' && (
          <CardForm
            card={editingCard}
            onCardCreated={handleCardCreated}
            onCardUpdated={handleCardUpdated}
            onCancel={handleCancelEdit}
          />
        )}
      </Container>
    </div>
  );
}

export default App;