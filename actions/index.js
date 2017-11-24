

export const LOAD_FROM_STORAGE = LOAD_FROM_STORAGE;
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD_TO_DESK = 'ADD_CARD_TO_DESK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const REMOVE_CARD_FROM_DESK = 'REMOVE_CARD_FROM_DESK';

export function loadFromStorage(storage) {
  return {
    type: LOAD_FROM_STORAGE,
    storage,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function removeDeck(deck) {
  return {
    type: REMOVE_DECK,
    deck,
  }
}

export function addCardToDeck(card, deck) {
  return {
    type: ADD_CARD_TO_DESK,
    card,
    deck,
  }
}

export function removeCardFromDeck(card, deck) {
  return {
    type: REMOVE_CARD_FROM_DESK,
    card,
    deck,
  }
}

