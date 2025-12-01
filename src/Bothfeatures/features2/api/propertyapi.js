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

        changemanagerpass: builder.mutation({
            query: (payload) => ({
                url: `/branchmanager/passwordchange`,
                method: 'PUT',
                body: payload,
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
                method: 'DELETE',
            })
        }),

        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `DeleteProperty/${id}`,
                method: 'DELETE',
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

        // ⭐ UPDATE ROOM DETAILS
        updateRoom: builder.mutation({
            query: ({ id, data }) => ({
                url: `updateroom/${id}`,
                method: "PUT",
                body: data
            })
        }),

        // ⭐ GET SINGLE ROOM
        getRoomById: builder.query({
            query: (roomId) => ({
                url: `get/${roomId}`
            })
        }),

        // ⭐ DELETE ONE IMAGE
        deleteRoomImage: builder.mutation({
            query: ({ id, imageurl }) => ({
                url: `deleteroomimage`,
                method: "DELETE",
                body: { id, imageurl }
            })
        }),

        // ⭐ ADD MULTIPLE IMAGES
       addRoomImages: builder.mutation({
      query: (formData) => ({
        url: `addroomimages`,
        method: "PUT",
        body: formData,
      }),
    }),


    }),

});

export const {
    useDeletePropertyMutation,
    useChangemanagerpassMutation,
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

    // ⬇ Newly added hooks
    useDeleteRoomImageMutation,
    useAddRoomImagesMutation,
} = propertyApi;

export default propertyApi;
