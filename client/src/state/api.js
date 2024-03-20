import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Donors",
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "CurrentItems",
    "ReleaseItems",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    getDonors: build.query({
      query: () => `donors/gets`,
      providesTags: ["Donors"],
    }),
    getDonor: build.query({
      query: (id) => `donors/donors/${id}`,
      providesTags: ["Donors"],
    }),
    deleteDonor: build.mutation({
      query: (donorId) => ({
        url: `donors/delete/${donorId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Donors"], // Invalidate the cache for "Donors" after deletion
    }),
    addDonor: build.mutation({
      query: ({ name, email, phone, password }) => ({
        url: `donors/add`,
        method: "POST",
        body: { name, email, phone, password },
      }),
      providesTags: ["Donors"],
    }),
    updateDonor: build.mutation({
      query: ({ donorId, name, email, phone, password }) => ({
        url: `donors/update/${donorId}`,
        method: "PUT",
        body: { name, email, phone, password },
      }),
      providesTags: ["Donors"],
    }),

    getCurrentItems: build.query({
      query: () => `general/currentItems`,
      providesTags: ["CurrentItems"],
    }),
    getCurrentItem: build.query({
      query: (id) => `general/currentItems/${id}`,
      providesTags: ["CurrentItems"],
    }),

    getReleaseItems: build.query({
      query: () => `general/releaseItems`,
      providesTags: ["ReleaseItems"],
    }),
    getReleaseItem: build.query({
      query: (id) => `general/releaseItems/${id}`,
      providesTags: ["ReleaseItems"],
    }),

    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),

    deleteCurrentItems: build.mutation({
      query: (itemId) => ({
        url: `general/currentItems/${itemId}`,
        method: "Delete",
      }),
      invalidatesTags: ["CurrentItems"], // Invalidate the cache for "Items" after deletion
    }),
    addCurrentItem: build.mutation({
      query: () => ({
        url: `general/currentItems`,
        method: "post",
      }),
      providesTags: ["CurrentItems"],
    }),

    deleteReleaseItems: build.mutation({
      query: (itemId) => ({
        url: `general/releaseItems/${itemId}`,
        method: "Delete",
      }),
      invalidatesTags: ["ReleaseItems"], // Invalidate the cache for "Items" after deletion
    }),
    addReleaseItem: build.mutation({
      query: () => ({
        url: `general/releaseItems`,
        method: "post",
      }),
      providesTags: ["ReleaseItems"],
    }),
  }),
});

export const {
  useGetDonorsQuery,
  useDeleteDonorMutation,
  useGetDonorQuery,
  useAddDonorMutation,
  useUpdateDonorMutation,

  useGetCurrentItemsQuery,
  useGetReleaseItemsQuery,

  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,

  useDeleteCurrentItemsMutation,
  useDeleteReleaseItemsMutation,

  useGetCurrentItemQuery,
  useGetReleaseItemQuery,

  useAddCurrentItemMutation,
  useAddReleaseItemMutation,
} = api;
