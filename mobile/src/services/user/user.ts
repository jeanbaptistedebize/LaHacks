import { api } from "../api";
import {
  AddPlantRequest,
  AddPlantResponce,
  GetAllPlant,
  GetOwnedPlant,
  GetUserResponse,
} from "./user.dto";

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
      invalidatesTags: ["Plant"],
    }),
    getAllPlant: build.query<GetAllPlant, void>({
      query: () => ({
        url: "/plant/all",
        method: "GET",
      }),
      providesTags: ["Plant"],
    }),
    getOwnedPlant: build.query<GetOwnedPlant, void>({
      query: () => ({
        url: "/plant/owned",
        method: "GET",
      }),
      providesTags: ["Plant"],
    }),
  }),
});

export const { useGetUserQuery, useAddPlantMutation, useGetAllPlantQuery } =
  userApi;
