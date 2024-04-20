import { api } from "../api";
import { AddPlantRequest, AddPlantResponce, GetAllPlant, GetUserResponse } from "./user.dto";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<GetUserResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    addPlant: build.mutation<AddPlantResponce, AddPlantRequest>({
      query: (body) => ({
        url: "/plant",
        body,
        method: "POST",
      }),
    }),
    getAllPlant: build.query<GetAllPlant, void>({
      query: () => ({
        url: "/plant/all",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useAddPlantMutation, useGetAllPlantQuery} = userApi;
