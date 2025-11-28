import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for all complaint-related API calls
const USER_API = "https://admin-backend-pgmega.onrender.com/api/complain/";
// const USER_API = import.meta.env.VITE_REACT_APP_COURSEAPI;

const ComplainApi = createApi({
  reducerPath: "complainapi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    
    createComplain: builder.mutation({
      query: (formData) => ({
        url: `create`,
        method: 'POST',
        body: formData,
      }),
    }),

   
    getAllComplain: builder.query({
      query: () => ``,
    }),

  
    getComplainByBranch: builder.query({
      query: (branchId) => `branch/${branchId}`,
    }),

   
    changeComplainStatus: builder.mutation({
      query: ({ complaintId, newStatus }) => ({
        url: `status/${complaintId}`,
        method: 'PATCH',
        body: { status: newStatus },
      }),
    }),

    
    assignComplain: builder.mutation({
      query: ({ complaintId, assignedTo }) => ({
        url: `assign`,
        method: 'put',
        body: { complaintId, assignedTo },
      }),
    }),

   
    getComplainByTenant: builder.query({
      query: (tenantId) => `tenant/${tenantId}`,
    }),

    getComplainByStatus: builder.query({
      query: (status) => `status/${status}`,
    }),

    getComplainByStatus: builder.query({
      query: (status) => `status/${status}`,
    }),

    updateComplain: builder.mutation({
      query: ({ complaintId, updatedData }) => ({
        url: `${complaintId}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    deleteComplain: builder.mutation({
      query: (complaintId) => ({
        url: `${complaintId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateComplainMutation,
  useGetAllComplainQuery,
  useGetComplainByBranchQuery,
  useChangeComplainStatusMutation,
  useAssignComplainMutation,
  useGetComplainByTenantQuery,
  useGetComplainByStatusQuery,
  useUpdateComplainMutation,
  useDeleteComplainMutation,
} = ComplainApi;

export default ComplainApi;
