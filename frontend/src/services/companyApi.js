import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE || 'http://localhost:5000/api/' }),

  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        Object.entries(filters || {}).forEach(([k, v]) => {
          if (v) params.append(k, v);
        });
        return `companies?${params.toString()}`;
      }
    }),
    addCompany: builder.mutation({
      query: (body) => ({
        url: 'companies/add',
        method: 'POST',
        body,
      })
    }),
    editCompany: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `companies/${id}`,
        method: 'PUT',
        body,
      })
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `companies/${id}`,
        method: 'DELETE',
      })
    })
  })
});

export const {
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation
} = companyApi;
