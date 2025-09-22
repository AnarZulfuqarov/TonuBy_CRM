import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://crmtonuby-production.up.railway.app/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('tonyByToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },

    }),
    endpoints: (builder) => ({
        loginSuperAdmin: builder.mutation({
            query: (credentials) => ({
                url: '/Admins/login',
                method: 'POST',
                body: credentials,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        getAllCompanies: builder.query({
            query: () => ({
                url: `/Companies`,
            }),
        }),
        createCompanies: builder.mutation({
            query: (company) => ({
                url: `/Companies`,
                method: 'POST',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        editCompanies: builder.mutation({
            query: (company) => ({
                url: `/Companies`,
                method: 'PUT',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        deleteCompanies: builder.mutation({
            query: (id) => ({
                url: `/Companies/${id}`,
                method: 'DELETE',
            }),
        }),
        getByIdCompanies: builder.query({
            query: (id) => ({
                url: `/Companies/${id}`,
            }),
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: `/Categories`,
            }),
        }),
        createCategories: builder.mutation({
            query: (company) => ({
                url: `/Categories`,
                method: 'POST',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        editCategories: builder.mutation({
            query: (company) => ({
                url: `/Categories`,
                method: 'PUT',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        deleteCategories: builder.mutation({
            query: (id) => ({
                url: `/Categories/${id}`,
                method: 'DELETE',
            }),
        }),
        getByIdCategories: builder.query({
            query: (id) => ({
                url: `/Categories/${id}`,
            }),
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `/Products`,
            }),
        }),
        createProducts: builder.mutation({
            query: (company) => ({
                url: `/Products`,
                method: 'POST',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        editProducts: builder.mutation({
            query: (company) => ({
                url: `/Products`,
                method: 'PUT',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/Products/${id}`,
                method: 'DELETE',
            }),
        }),
        getByIdProducts: builder.query({
            query: (id) => ({
                url: `/Products/${id}`,
            }),
        }),
        getByIdCashOperator: builder.query({
            query: (companyId) => ({
                url: `/CashOperations/company/${companyId}/operations`,
            }),
        }),

    }),
});

// Hookları dışarı açıyoruz:
export const {
    useLoginSuperAdminMutation,

    useGetAllCompaniesQuery,
    useCreateCompaniesMutation,
    useEditCompaniesMutation,
    useDeleteCompaniesMutation,
    useGetByIdCompaniesQuery,

    useGetAllCategoriesQuery,
    useCreateCategoriesMutation,
    useEditCategoriesMutation,
    useDeleteCategoriesMutation,
    useGetByIdCategoriesQuery,

    useGetAllProductsQuery,
    useCreateProductsMutation,
    useEditProductsMutation,
    useDeleteProductsMutation,
    useGetByIdProductsQuery,

    useGetByIdCashOperatorQuery,

} = api;