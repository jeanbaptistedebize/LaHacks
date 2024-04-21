import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "http://10.20.0.78:3000",
  credentials: "include"
});

export const api = createApi({
  baseQuery,
  tagTypes: ["User", 'Plant'],
  endpoints: () => ({}),
});
