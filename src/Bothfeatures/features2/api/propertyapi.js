import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const USER_API = "http://localhost:5000/api/property/";


const propertyApi = createApi({
    reducerPath: "propertyapi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        addbranch: builder.mutation({
            query: (payload) => ({
                url: 'add',
                method: 'POST',
                body: payload,
            })
        }),
        getAllBranch: builder.query({
            query: () => ({
                url: `get`
            })
        }),
        getAllBranchByOwner: builder.query({
            query: () => ({
                url: `getalllbranchowner`
            })
        }),
        
        getAllBranchbybranchId: builder.query({
            query: () => ({
                url: `getbranch/bybranchMnager`
            })
        }),

        addbranchmanager: builder.mutation({
            query: ({ managerData, branchid }) => ({
                url: `createbranchmanager/${branchid}`,
                method: 'POST',
                body: managerData,
            })
        }),
        addRoom: builder.mutation({
            query: (formData) => ({
                url: `addroom`,
                method: 'POST',
                body: formData,
            })
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `deleteroom/${id}`,
                method: 'Delete',
            })
        }),
        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `DeleteProperty/${id}`,
                method: 'Delete',
            })
        }),
         addHotelRoom: builder.mutation({
            query: (dataToSend) => ({
                url: `addhotelroom`,
                method: 'POST',
                body: dataToSend,
            })
        }),

        getAllRoom: builder.query({
            query: () => ({
                url: `allrooms`
            })
        }),


        updateRoom: builder.mutation({
            query: ({ id, data }) => ({
                url: `updateroom/${id}`,
                method:"put",
                body:data
            })
        }),
         getRoomById: builder.query({
            query: (id) => ({
                url: `getroombyid/${id}`
            })
        }),

        






    }),

});

export const {
    useDeletePropertyMutation,
    useGetAllBranchByOwnerQuery,
    useGetRoomByIdQuery,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetAllBranchbybranchIdQuery,
    useAddbranchMutation,
    useGetAllRoomQuery,
    useGetAllBranchQuery,
    useAddRoomMutation,
    useAddHotelRoomMutation,
    useAddbranchmanagerMutation,
} = propertyApi;
export default propertyApi;


