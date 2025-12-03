import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




const USER_API = "http://localhost:5000/api/payment";
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),


  endpoints: (builder) => ({
    // 🔹 1. Get all branch payments
    getAllPayments: builder.query({
      query: () => "/allpayment",
    }),

    // 🔹 2. Create a new payment
    createPayment: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),
    razorpayPayment: builder.mutation({
      query: (amount) => ({
        url: `create-order`,
        method: 'POST',
        body: amount,
      })
    }),
    razorpayPaymentVerify: builder.mutation({
      query: (response) => ({
        url: `verify-payment`,
        method: 'POST',
        body: response,
      })
    }),

    // 🔹 3. Create a new expense
    createExpense: builder.mutation({
      query: (body) => ({
        url: "/create/expense",
        method: "POST",
        body,
      }),
    }),

    // 🔹 4. Get combined revenue details (with optional query params)
    getRevenueDetails: builder.query({
      query: (params) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
        return `/getdetails${queryString}`;
      },
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useRazorpayPaymentVerifyMutation,
  useRazorpayPaymentMutation,
  useCreatePaymentMutation,
  useCreateExpenseMutation,
  useGetRevenueDetailsQuery,
} = paymentApi;

export default paymentApi;
