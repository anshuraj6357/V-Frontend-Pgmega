import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedin, userLoggedout } from "../authSlice.js";

// const USER_API = import.meta.env.VITE_REACT_APP_AUTHAPI;

const USER_API = "http://localhost:5000/api/v1/user/";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formdata) => ({ url: "register", method: "POST", body: formdata }),
    }),
    ForgotUser: builder.mutation({
      query: (email) => ({
        url: `forgotpassword`,
        method: `POST`,
        body: email
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `profile`,
      }),
    }),
    ForgotUserpassword: builder.mutation({
      query: ({ password, confermpassword,resettoken }) => ({
        url: `forgotpassword/${resettoken}`,
        method: `POST`,
        body: { password, confermpassword }
      }),
    }),
    loginUser: builder.mutation({
      query: (formdata) => ({ url: "login", method: "POST", body: formdata }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedin({ user: result.data.existingUser }));
          localStorage.setItem("user", JSON.stringify(result.data.existingUser));
        } catch (err) {
          console.log("login error:", err);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({ url: "logout", method: "GET" }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedout());
          dispatch(authApi.util.resetApiState());
        } catch (err) {
          console.log("logout error:", err);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({ url: "profile", method: "GET" }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data?.profile) {
            dispatch(userLoggedin({ user: result.data.profile }));
          } else {
            dispatch(userLoggedout());
          }
        } catch {
          dispatch(userLoggedout());
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formdata) => ({ url: "profile/update", method: "PUT", body: formdata }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedin({ user: result.data.user }));
          localStorage.setItem("user", JSON.stringify(result.data.user));
        } catch (err) {
          console.log("update user error:", err);
        }
      },
    }),
  }),
});

export const {
  useForgotUserpasswordMutation,
  useProfileQuery,
  useForgotUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
} = authApi;

export default authApi;
