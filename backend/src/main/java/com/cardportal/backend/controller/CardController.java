package com.cardportal.backend.controller;

import com.cardportal.backend.dto.CardDto;
import com.cardportal.backend.service.CardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "http://localhost:3000")
public class CardController {
    
    @Autowired
    private CardService cardService;
    
    @GetMapping
    public ResponseEntity<List<CardDto>> getAllCards() {
        List<CardDto> cards = cardService.getAllCards();
        return ResponseEntity.ok(cards);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CardDto> getCardById(@PathVariable Long id) {
        return cardService.getCardById(id)
                .map(card -> ResponseEntity.ok(card))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/number/{cardNumber}")
    public ResponseEntity<CardDto> getCardByNumber(@PathVariable String cardNumber) {
        return cardService.getCardByNumber(cardNumber)
                .map(card -> ResponseEntity.ok(card))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/holder/{holderName}")
    public ResponseEntity<List<CardDto>> getCardsByHolderName(@PathVariable String holderName) {
        List<CardDto> cards = cardService.getCardsByHolderName(holderName);
        return ResponseEntity.ok(cards);
    }
    
    @GetMapping("/type/{cardType}")
    public ResponseEntity<List<CardDto>> getCardsByType(@PathVariable String cardType) {
        List<CardDto> cards = cardService.getCardsByType(cardType);
        return ResponseEntity.ok(cards);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<CardDto>> getActiveCards() {
        List<CardDto> cards = cardService.getActiveCards();
        return ResponseEntity.ok(cards);
    }
    
    @GetMapping("/types")
    public ResponseEntity<List<String>> getAllCardTypes() {
        List<String> cardTypes = cardService.getAllCardTypes();
        return ResponseEntity.ok(cardTypes);
    }
    
    @PostMapping
    public ResponseEntity<CardDto> createCard(@Valid @RequestBody CardDto cardDto) {
        try {
            CardDto createdCard = cardService.createCard(cardDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCard);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CardDto> updateCard(@PathVariable Long id, @Valid @RequestBody CardDto cardDto) {
        return cardService.updateCard(id, cardDto)
                .map(card -> ResponseEntity.ok(card))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        if (cardService.deleteCard(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateCard(@PathVariable Long id) {
        if (cardService.deactivateCard(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}