package com.cardportal.backend.repository;

import com.cardportal.backend.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    
    Optional<Card> findByCardNumber(String cardNumber);
    
    List<Card> findByCardHolderNameContainingIgnoreCase(String cardHolderName);
    
    List<Card> findByCardType(String cardType);
    
    List<Card> findByIsActive(Boolean isActive);
    
    @Query("SELECT c FROM Card c WHERE c.cardHolderName LIKE %:name% AND c.cardType = :type")
    List<Card> findByNameAndType(@Param("name") String name, @Param("type") String type);
    
    @Query("SELECT DISTINCT c.cardType FROM Card c")
    List<String> findAllCardTypes();
}