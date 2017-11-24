import { combineReducers } from 'redux';

import {
  ADD_CARD_TO_DESK,
  ADD_DECK,
  LOAD_FROM_STORAGE,
  REMOVE_CARD_FROM_DESK,
  REMOVE_DECK
} from '../actions';

const deck = (state = {
  list: [],
  refById: {},
  lastId: 0,
}, action) => {
  switch (action.type) {
    case LOAD_FROM_STORAGE: return { ...action.storage.desk }
    case ADD_DECK: {
      const lastId = state.lastId + 1;
      const list = state.list.concat(lastId);
      const refById = {
        ...state.refById,
        [lastId]: {
          ...action.deck,
          count: 0,
          id: lastId,
        },
      }
      return {
        ...state,
        lastId,
        list,
        refById,
      }
    }
    default: return state;
  }
}

const card = (state = {
  list: [],
  refById: {},
  lastId: 0,
}, action) => {
  switch (action.type) {
    case LOAD_FROM_STORAGE: return { ...action.storage.card }
    case ADD_CARD_TO_DESK: {
      const lastId = state.lastId + 1;
      const list = state.list.concat(lastId);
      const refById = {
        ...state.refById,
        [lastId]: {
          ...action.card,
          id: lastId,
          deckId: action.deck.id,
        },
      }
      return {
        ...state,
        lastId,
        list,
        refById,
      }
    }
    default: return state;
  }
}

export default combineReducers({ deck, card })