import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Donors",
    "User",
    "Events",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    " ItemsOverview",
    "Items",

    "TreeEvents",
    "Sponsors",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    adminSignIn: build.mutation({
      query: ({ email, password }) => ({
        url: "auth/signin",
        method: "POST",
        body: { email, password },
      }),
    }),

    // Signup endpoint
    adminSignUp: build.mutation({
      query: ({ firstName, email, lastName, password }) => ({
        url: "users/signup",
        method: "POST",
        body: { firstName, email, lastName, password },
      }),
    }),

    resetPassword: build.mutation({
      query: ({ userId, password }) => ({
        url: `users/${userId}/resetPassword`,
        method: "POST",
        body: { password },
      }),
    }),

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
    resetPasswordDonor: build.mutation({
      query: ({ donorId, password }) => ({
        url: `donors/reset/${donorId}`,
        method: "PUT",
        body: { password },
      }),
    }),

    //Donation Events Start
    getDEvents: build.query({
      query: () => `donorevents/gets`,
      providesTags: ["Events"],
    }),
    getDEvent: build.query({
      query: (id) => `donorevents/events/${id}`,
      providesTags: ["Events"],
    }),
    deleteDEvent: build.mutation({
      query: (eventId) => ({
        url: `donorevents/delete/${eventId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Events"], // Invalidate the cache for "Donors" after deletion
    }),
    addDEvent: build.mutation({
      query: ({ eventName, location, date, description, cover }) => ({
        url: `donorevents/add`,
        method: "POST",
        body: { eventName, location, date, description, cover },
      }),
      providesTags: ["Events"],
    }),
    updateDEvent: build.mutation({
      query: ({ id, eventName, date, location, description, cover }) => ({
        url: `donorevents/update/${id}`,
        method: "PUT",
        body: { eventName, date, location, description, cover },
      }),
      providesTags: ["Events"],
    }),

    //Donation Events End

    //treeplantationEvent Start

    getTreeEvents: build.query({
      query: () => `treePlantationEvent/gets`,
      providesTags: ["TreeEvents"],
    }),
    getTreeEvent: build.query({
      query: (id) => `treePlantationEvent/events/${id}`,
      providesTags: ["TreeEvents"],
    }),
    deleteTreeEvent: build.mutation({
      query: (eventId) => ({
        url: `treePlantationEvent/delete/${eventId}`,
        method: "Delete",
      }),
      invalidatesTags: ["TreeEvents"], // Invalidate the cache for "Events" after deletion
    }),
    addTreeEvent: build.mutation({
      query: ({
        coverImage,
        eventID,
        eventName,
        eventDate,
        province,
        district,
        city,
        comments,
      }) => ({
        url: `treePlantationEvent/add`,
        method: "POST",
        body: {
          coverImage,
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          comments,
        }, // Prepare form data for file upload
      }),
      providesTags: ["TreeEvents"],
    }),
    updateTreeEvent: build.mutation({
      query: (eventDetails) => ({
        url: `treePlantationEvent/update/${eventDetails.eventId}`,
        method: "PUT",
        body: { eventDetails }, // Prepare form data for file upload
      }),
      providesTags: ["TreeEvents"],
    }),

    //treeplantationEvent End

    // Sponsor endpoints
    getSponsors: build.query({
      query: () => `sponsors/gets`,
      providesTags: ["Sponsors"],
    }),
    getSponsor: build.query({
      query: (id) => `sponsors/events/${id}`,
      providesTags: ["Sponsors"],
    }),
    deleteSponsor: build.mutation({
      query: (eventId) => ({
        url: `sponsors/delete/${eventId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Sponsors"], // Invalidate the cache for "Sponsors" after deletion
    }),
    addSponsor: build.mutation({
      query: ({
        eventID,
        eventName,
        eventDate,
        province,
        district,
        city,
        donations,
      }) => ({
        url: `sponsors/add`,
        method: "POST",
        body: {
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          donations,
        },
      }),
      providesTags: ["Sponsors"],
    }),
    updateSponsor: build.mutation({
      query: ({
        eventId,
        eventID,
        eventName,
        eventDate,
        province,
        district,
        city,
        donations,
      }) => ({
        url: `sponsors/update/${eventId}`,
        method: "PUT",
        body: {
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          donations,
        },
      }),
      providesTags: ["Sponsors"],
    }),

    //sponsor End

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

    getItemsOut: build.query({
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
      query: ({ itemName, itemId, quantity, eventName, eventId, date }) => ({
        url: `items_out/add`,
        method: "POST",
        body: { itemName, itemId, quantity, eventName, eventId, date },
      }),
      providesTags: ["Items_out"],
    }),
    updateItems_out: build.mutation({
      query: ({
        itemID,
        itemId,
        itemName,
        quantity,
        eventId,
        eventName,
        date,
      }) => ({
        url: `items_out/update/${itemID}`,
        method: "PUT",
        body: { itemName, itemId, quantity, eventId, eventName, date },
      }),
      providesTags: ["Items_out"],
    }),

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
      query: ({ itemName, itemId, quantity, donorId, donorName, date }) => ({
        url: `items_in/add`,
        method: "POST",
        body: { itemName, itemId, quantity, donorName, donorId, date },
      }),
      providesTags: ["Items_in"],
    }),
    updateItems_in: build.mutation({
      query: ({
        itemID,
        itemName,
        itemId,
        donorName,
        quantity,
        donorId,
        date,
      }) => ({
        url: `items_in/update/${itemID}`,
        method: "PUT",
        body: { itemName, itemId, donorName, quantity, donorId, date },
      }),
      providesTags: ["Items_in"],
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
  }),
});

export const {
  useGetDonorsQuery,
  useDeleteDonorMutation,
  useGetDonorQuery,
  useAddDonorMutation,
  useUpdateDonorMutation,
  useGetLeaderboardQuery,
  useResetPasswordDonorMutation,

  useGetDEventsQuery,
  useDeleteDEventMutation,
  useGetDEventQuery,
  useAddDEventMutation,
  useUpdateDEventMutation,

  useGetTreeEventsQuery,
  useDeleteTreeEventMutation,
  useGetTreeEventQuery,
  useAddTreeEventMutation,
  useUpdateTreeEventMutation,

  useGetSponsorsQuery,
  useDeleteSponsorMutation,
  useGetSponsorQuery,
  useAddSponsorMutation,
  useUpdateSponsorMutation,

  useGetItemsQuery,
  useDeleteItemsMutation,
  useGetItemQuery,
  useAddItemsMutation,
  useUpdateItemsMutation,

  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,

  useAdminSignInMutation,
  useAdminSignUpMutation,
  useResetPasswordMutation,

  useGetItemsOutQuery,
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
