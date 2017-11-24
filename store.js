import { createStore } from 'redux';
import reducer from './reducers';
import { saveToStorage, fetchFromStorage } from './api';

export const initStore = () => fetchFromStorage().then(storeData => {
  const store = createStore(reducer, storeData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  const saveStorageHandler = () => {
    saveToStorage(store.getState())
  }
  const unsubscribe = store.subscribe(saveStorageHandler);
  const unmountStore = () => {
    unsubscribe();
    saveStorageHandler();
  }
  return { store, unmountStore };
});