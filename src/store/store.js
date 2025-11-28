import { configureStore } from "@reduxjs/toolkit";
import authReducer, { hydrateUser } from "../components/features/authSlice";
import { PgApi } from "../components/features/api/allpg";
import authApi  from "../components/features/api/authapi";




export const appStore = configureStore({
  reducer: {
      auth: authReducer,
 
    [PgApi.reducerPath]: PgApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, PgApi.middleware),
});


const initializeUser = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return { user: null, isAuthenticated: false };

  try {
    const parsedUser = JSON.parse(storedUser);
    const isValidUser = parsedUser && Object.keys(parsedUser).length > 0;
    return {
      user: isValidUser ? parsedUser : null,
      isAuthenticated: isValidUser,
    };
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return { user: null, isAuthenticated: false };
  }
};

const initialUserState = initializeUser();
appStore.dispatch(hydrateUser(initialUserState));

