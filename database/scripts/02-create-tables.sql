-- Create tables and sequences for Card Portal
-- Run this as cardportal user

-- Create sequence for card IDs
CREATE SEQUENCE CARD_SEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

-- Create cards table
CREATE TABLE cards (
    id NUMBER(19) PRIMARY KEY,
    card_number VARCHAR2(20) NOT NULL UNIQUE,
    card_holder_name VARCHAR2(100) NOT NULL,
    card_type VARCHAR2(50) NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL CHECK (is_active IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_cards_number ON cards(card_number);
CREATE INDEX idx_cards_holder_name ON cards(card_holder_name);
CREATE INDEX idx_cards_type ON cards(card_type);
CREATE INDEX idx_cards_active ON cards(is_active);

-- Create trigger for updated_at timestamp
CREATE OR REPLACE TRIGGER cards_update_timestamp
    BEFORE UPDATE ON cards
    FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

-- Insert sample data
INSERT INTO cards (id, card_number, card_holder_name, card_type, expiry_date, is_active, created_at)
VALUES (CARD_SEQ.NEXTVAL, '1234567890123456', 'John Doe', 'Credit', 
        TO_TIMESTAMP('2025-12-31 23:59:59', 'YYYY-MM-DD HH24:MI:SS'), 1, CURRENT_TIMESTAMP);

INSERT INTO cards (id, card_number, card_holder_name, card_type, expiry_date, is_active, created_at)
VALUES (CARD_SEQ.NEXTVAL, '2345678901234567', 'Jane Smith', 'Debit', 
        TO_TIMESTAMP('2026-06-30 23:59:59', 'YYYY-MM-DD HH24:MI:SS'), 1, CURRENT_TIMESTAMP);

INSERT INTO cards (id, card_number, card_holder_name, card_type, expiry_date, is_active, created_at)
VALUES (CARD_SEQ.NEXTVAL, '3456789012345678', 'Bob Johnson', 'Prepaid', 
        TO_TIMESTAMP('2024-03-31 23:59:59', 'YYYY-MM-DD HH24:MI:SS'), 0, CURRENT_TIMESTAMP);

COMMIT;