import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const USER_API = "https://admin-backend-pgmega.onrender.com/api/tenant/";
// const USER_API = import.meta.env.VITE_REACT_APP_COURSEAPI;


const TenantApi = createApi({
    reducerPath: "tenantapi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        addTenant: builder.mutation({
            query: (formdata) => ({
                url: `create`,
                method: 'POST',
                body: formdata,
            })
        }),
        getAllTenant: builder.query({
            query: () => ({
                url: `GetTenantsByBranch`
            })
        }),
        getallactivetenant: builder.query({
            query: (selectedBranch) => ({
                url: `activetenant/${selectedBranch}`
            })
        }),
         getAllTenantByBranchId: builder.query({
            query: (id) => ({
                url: `GetTenantsByBranchid/${id}`
            })
        }),
        getTenantById: builder.query({
            query: (id) => ({
                url: `GetTenantByid/${id}`
            })
        }),
        updateTenant: builder.mutation({
            query: ({formdata,id}) => ({
                url: `update/${id}`,
                method: 'put',
                body: formdata,
            })
        }),

         changeStatus: builder.query({
            query: (id) => ({
                url: `markinctive/${id}`,
                method: 'post',
            })
        }),
          getStatus: builder.query({
            query: (status) => ({
                url: `allstatus/${status}`,

            })
        }),

    }),

});
export const { useAddTenantMutation,
    useGetallactivetenantQuery,
    useGetStatusQuery,
    useGetAllTenantQuery,
    useChangeStatusQuery,
    useGetTenantByIdQuery,
    useUpdateTenantMutation,
    useGetAllTenantByBranchIdQuery
} = TenantApi;

export default TenantApi;


