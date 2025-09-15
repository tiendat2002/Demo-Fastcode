package com.cardportal.backend.service;

import com.cardportal.backend.dto.CardDto;
import com.cardportal.backend.entity.Card;
import com.cardportal.backend.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CardService {
    
    @Autowired
    private CardRepository cardRepository;
    
    public List<CardDto> getAllCards() {
        return cardRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<CardDto> getCardById(Long id) {
        return cardRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public Optional<CardDto> getCardByNumber(String cardNumber) {
        return cardRepository.findByCardNumber(cardNumber)
                .map(this::convertToDto);
    }
    
    public List<CardDto> getCardsByHolderName(String holderName) {
        return cardRepository.findByCardHolderNameContainingIgnoreCase(holderName).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CardDto> getCardsByType(String cardType) {
        return cardRepository.findByCardType(cardType).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CardDto> getActiveCards() {
        return cardRepository.findByIsActive(true).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<String> getAllCardTypes() {
        return cardRepository.findAllCardTypes();
    }
    
    public CardDto createCard(CardDto cardDto) {
        Card card = convertToEntity(cardDto);
        Card savedCard = cardRepository.save(card);
        return convertToDto(savedCard);
    }
    
    public Optional<CardDto> updateCard(Long id, CardDto cardDto) {
        return cardRepository.findById(id)
                .map(existingCard -> {
                    existingCard.setCardNumber(cardDto.getCardNumber());
                    existingCard.setCardHolderName(cardDto.getCardHolderName());
                    existingCard.setCardType(cardDto.getCardType());
                    existingCard.setExpiryDate(cardDto.getExpiryDate());
                    existingCard.setIsActive(cardDto.getIsActive());
                    Card updatedCard = cardRepository.save(existingCard);
                    return convertToDto(updatedCard);
                });
    }
    
    public boolean deleteCard(Long id) {
        if (cardRepository.existsById(id)) {
            cardRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public boolean deactivateCard(Long id) {
        return cardRepository.findById(id)
                .map(card -> {
                    card.setIsActive(false);
                    cardRepository.save(card);
                    return true;
                })
                .orElse(false);
    }
    
    private CardDto convertToDto(Card card) {
        CardDto dto = new CardDto();
        dto.setId(card.getId());
        dto.setCardNumber(card.getCardNumber());
        dto.setCardHolderName(card.getCardHolderName());
        dto.setCardType(card.getCardType());
        dto.setExpiryDate(card.getExpiryDate());
        dto.setIsActive(card.getIsActive());
        dto.setCreatedAt(card.getCreatedAt());
        dto.setUpdatedAt(card.getUpdatedAt());
        return dto;
    }
    
    private Card convertToEntity(CardDto dto) {
        Card card = new Card();
        card.setCardNumber(dto.getCardNumber());
        card.setCardHolderName(dto.getCardHolderName());
        card.setCardType(dto.getCardType());
        card.setExpiryDate(dto.getExpiryDate());
        if (dto.getIsActive() != null) {
            card.setIsActive(dto.getIsActive());
        }
        return card;
    }
}