import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "http://172.20.10.9:3000",
    // "http://172.20.10.3:3000",
  credentials: "include",
});

export const api = createApi({
  baseQuery,
  tagTypes: ["User", "Plant"],
  endpoints: () => ({}),
});
