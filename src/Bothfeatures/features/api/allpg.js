import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PgApi = createApi({
    reducerPath: "PgApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/property/",
        credentials: "include",
    }),
    endpoints: (builder) => ({

        getAllListedPg: builder.query({
            query: () => ({
                url: "/allpg",
                method: "GET",
            }),
        }),
        getMapPg: builder.query({
            query: () => ({
                url: "/getmapofpg",
                method: "GET",
            }),
        }),


        getPgById: builder.query({
            query: (id) => ({
                url: `get/${id}`,

            }),
        }),
        appliedAllFiltered: builder.mutation({
            query: ({ formdata }) => ({
                url: `appliedallfilter`,
                method: "post",
                body: formdata
            })
        }),


        getAllFiltered: builder.query({
            query: (cityFromQuery) => ({
                url: `filtered/${cityFromQuery}`,
            })
        }),
    }),
});

export const {
    useGetMapPgQuery,
    useAppliedAllFilteredMutation,
    useGetAllFilteredQuery,
    useGetAllListedPgQuery,
    useGetPgByIdQuery,
} = PgApi;

export default PgApi;

