import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 const USER_API = "https://admin-backend-pgmega.onrender.com/api/v1/coursepurchase/";


//   const USER_API = import.meta.env.VITE_REACT_APP_PURCHASEAPI;

const purchaseApi = createApi({
    reducerPath: "purchaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        CreateCheckOutSession: builder.mutation({
            query: (courseId) => ({
                url: 'checkout/create-checkout-session', 
                method: 'POST',
                body: { courseId } 
            })
        }),
        Getallpurchasedcourse: builder.query({
            query: () => ({
                url: 'getallpurchasedcourse',
            })
        }),
        Checkcoursestatus: builder.query({
            query: (courseId) => ({
                url: `purchasedcoursedetail/${courseId}`,
            }),
        }),
        FetchAllsoldedcourses: builder.query({
            query: () => ({
                url: '/coursesold/data',
            })
        })
    })
})

export const {
    useCreateCheckOutSessionMutation,
    useFetchAllsoldedcoursesQuery,
    useGetallpurchasedcourseQuery,
    useCheckcoursestatusQuery
} = purchaseApi;

export default purchaseApi;
