// @ts-nocheck
import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

// Helper functions for localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (!serializedState) return undefined; // Let reducers initialize state if not found
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

// Initial product state
const initialProductState = [];

// Product reducer
const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

// Initial authentication state
const initialAuthState = {
  user: null,
  loading: false,
  error: null,
};

// Auth reducer
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  products: productReducer, // Handles product-related actions
  auth: authReducer, // Handles authentication-related actions
});

// Load persisted state
const persistedAuthState = loadFromLocalStorage();

// Create store with middleware and persisted state
const store = createStore(
  rootReducer,
  { auth: persistedAuthState || initialAuthState }, // Load only the `auth` part
  applyMiddleware(thunk)
);

// Subscribe to store changes and persist state
store.subscribe(() => {
  saveToLocalStorage(store.getState().auth); // Save only the `auth` state
});

export default store;
