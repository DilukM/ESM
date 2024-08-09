import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Donors",
    "CurrentItems",
    "ReleaseItems",
    "Items",
    "Items_out",
    "Items_in",
  ],
  endpoints: (build) => ({
    getDonors: build.query({
      query: () => `donors/gets`,
      providesTags: ["Donors"],
    }),
    getLeaderboard: build.query({
      query: () => `donors/leaderboard`,
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
      query: ({ donorId, name, email, phone }) => ({
        url: `donors/update/${donorId}`,
        method: "PUT",
        body: { name, email, phone },
      }),
      providesTags: ["Donors"],
    }),

    //Items...

    getItems: build.query({
      query: () => `items/gets`,
      providesTags: ["Items"],
    }),
    getItem: build.query({
      query: (id) => `items/get/${id}`,
      providesTags: ["Items"],
    }),
    deleteItems: build.mutation({
      query: (itemID) => ({
        url: `items/delete/${itemID}`,
        method: "Delete",
      }),
      invalidatesTags: ["Items"], // Invalidate the cache for "Items" after deletion
    }),
    addItems: build.mutation({
      query: ({ itemName, unit, unitScore }) => ({
        url: `items/add`,
        method: "POST",
        body: { itemName, unit, unitScore },
      }),
      providesTags: ["Items"],
    }),
    updateItems: build.mutation({
      query: ({ itemID, itemName, unit, unitScore }) => ({
        url: `items/update/${itemID}`,
        method: "PUT",
        body: { itemName, unit, unitScore },
      }),
      providesTags: ["Items"],
    }),

    //...

    // Items_out...

    getItems_out: build.query({
      query: () => `items_out/gets`,
      providesTags: ["Items_out"],
    }),
    getItem_out: build.query({
      query: (id) => `items_out/get/${id}`,
      providesTags: ["Items_out"],
    }),
    deleteItems_out: build.mutation({
      query: (itemID) => ({
        url: `items_out/delete/${itemID}`,
        method: "Delete",
      }),
      invalidatesTags: ["Items_out"], // Invalidate the cache for "Items" after deletion
    }),
    addItems_out: build.mutation({
      query: ({ itemName, quantity, eventId, date }) => ({
        url: `items_out/add`,
        method: "POST",
        body: { itemName, quantity, eventId, date },
      }),
      providesTags: ["Items_out"],
    }),
    updateItems_out: build.mutation({
      query: ({ itemID, itemName, quantity, eventId, date }) => ({
        url: `items_out/update/${itemID}`,
        method: "PUT",
        body: { itemName, quantity, eventId, date },
      }),
      providesTags: ["Items_out"],
    }),

    //...

    // Items_in...

    getItemsIn: build.query({
      query: () => `items_in/gets`,
      providesTags: ["Items_in"],
    }),
    getItem_in: build.query({
      query: (id) => `items_in/get/${id}`,
      providesTags: ["Items_in"],
    }),
    deleteItems_in: build.mutation({
      query: (itemID) => ({
        url: `items_in/delete/${itemID}`,
        method: "Delete",
      }),
      invalidatesTags: ["Items_in"], // Invalidate the cache for "Items" after deletion
    }),
    addItems_in: build.mutation({
      query: ({ itemName, quantity, donorId, date }) => ({
        url: `items_in/add`,
        method: "POST",
        body: { itemName, quantity, donorId, date },
      }),
      providesTags: ["Items_in"],
    }),
    updateItems_in: build.mutation({
      query: ({ itemID, itemName, quantity, donorId, date }) => ({
        url: `items_in/update/${itemID}`,
        method: "PUT",
        body: { itemName, quantity, donorId, date },
      }),
      providesTags: ["Items_in"],
    }),
  }),
});

export const {
  useGetItemssQuery,
  // useDeleteItemsMutation,

  useGetItemsQuery,
  useDeleteItemsMutation,
  useGetItemQuery,
  useAddItemsMutation,
  useUpdateItemsMutation,

  useGetItems_outQuery,
  useDeleteItems_outMutation,
  useGetItem_outQuery,
  useAddItems_outMutation,
  useUpdateItems_outMutation,

  useGetItemsInQuery,
  useDeleteItems_inMutation,
  useGetItem_inQuery,
  useAddItems_inMutation,
  useUpdateItems_inMutation,
} = api;
