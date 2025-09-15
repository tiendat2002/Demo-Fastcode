import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the card service to avoid axios import issues
jest.mock('./services/cardService', () => ({
  cardService: {
    getAllCards: jest.fn(() => Promise.resolve({ data: [] })),
    getAllCardTypes: jest.fn(() => Promise.resolve({ data: [] })),
    createCard: jest.fn(),
    updateCard: jest.fn(),
    deleteCard: jest.fn(),
    deactivateCard: jest.fn(),
  },
}));

test('renders card portal title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Card Portal/i);
  expect(titleElement).toBeInTheDocument();
});