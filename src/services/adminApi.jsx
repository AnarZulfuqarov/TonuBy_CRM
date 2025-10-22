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
        getByIdCashBalance: builder.query({
            query: (companyId) => ({
                url: `/CashOperations/company/${companyId}/balance`,
            }),
        }),
        getByIdCashReporte: builder.query({
            query: ({companyId,startDate,endDate}) => ({
                url: `/CashOperations/report?companyId=${companyId}&startDate=${startDate}&endDate=${endDate}`,
            }),
        }),
        getByIdCashReporteChart: builder.query({
            query: (body) => ({
                url: `/CashOperations/product-totals`,
                method:'POST',
                body: body,
            }),
        }),
        deleteCashOperator: builder.mutation({
            query: (id) => ({
                url: `/CashOperations/${id}`,
                method: 'DELETE',
            }),
        }),
        createCashOperator: builder.mutation({
            query: (company) => ({
                url: `/CashOperations`,
                method: 'POST',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        getSummaryChart: builder.query({
            query: ({companyId}) => ({
                url: `/DebtOperations/filter?companyId=${companyId}`,
            }),
        }),
        createDebtOperator: builder.mutation({
            query: (company) => ({
                url: `/DebtOperations`,
                method: 'POST',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        createDebtPay: builder.mutation({
            query: (company) => ({
                url: `/DebtOperations/pay`,
                method: 'POST',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        deleteDebtOperator: builder.mutation({
            query: (id) => ({
                url: `/DebtOperations/${id}`,
                method: 'DELETE',
            }),
        }),
        getSummaryChart2: builder.query({
            query: ({companyId,categoryId}) => ({
                url: `/DebtOperations/summary/chart?companyId=${companyId}&categoryId=${categoryId}`,
            }),
        }),
        editDebtAmount: builder.mutation({
            query: (company) => ({
                url: `/DebtOperations/update-received`,
                method: 'PUT',
                body: company,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        getAllClients: builder.query({
            query: () => ({
                url: `/Clients`,
            }),
        }),
        createClients: builder.mutation({
            query: (client) => ({
                url: `/Clients`,
                method: 'POST',
                body: client,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        editClients: builder.mutation({
            query: (client) => ({
                url: `/Clients`,
                method: 'PUT',
                body: client,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        deleteClients: builder.mutation({
            query: (id) => ({
                url: `/Clients/${id}`,
                method: 'DELETE',
            }),
        }),
        getByIdClients: builder.query({
            query: (id) => ({
                url: `/Clients/${id}`,
            }),
        }),
        getByCompanyClients: builder.query({
            query: (companyId) => ({
                url: `/Clients/${companyId}/getall`,
            }),
        })
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
    useCreateCashOperatorMutation,
    useGetByIdCashBalanceQuery,
    useDeleteCashOperatorMutation,

    useGetSummaryChartQuery,
    useCreateDebtOperatorMutation,
    useDeleteDebtOperatorMutation,
    useCreateDebtPayMutation,

    useGetByIdCashReporteQuery,
    useGetByIdCashReporteChartQuery,
    useGetSummaryChart2Query,
    useEditDebtAmountMutation,

    useGetAllClientsQuery,
    useGetByCompanyClientsQuery,
    useCreateClientsMutation,
    useEditClientsMutation,
    useDeleteClientsMutation,
    useGetByIdClientsQuery,
} = api;