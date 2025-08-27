import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase.app";

// Action creators
export const setUser = (user) => ({ type: "SET_USER", payload: user });
export const setLoading = (loading) => ({ type: "SET_LOADING", payload: loading });
export const setError = (error) => ({ type: "SET_ERROR", payload: error });
export const logoutUser = () => ({ type: "LOGOUT" });

// Register action
export const register = (email, password,) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("userReg",user);
    dispatch(setUser({ email: user.email, uid: user.uid, name }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Login action
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("userLogin",user);
    dispatch(setUser({ email: user.email, uid: user.uid }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(logoutUser());
    
    dispatch(setError(null))
    console.log("Logout from the state");
  } catch (error) {
    dispatch(setError(error.message));
    
  } finally {
    dispatch(setLoading(false));
    // dispatch(setError(null))
  }
};
