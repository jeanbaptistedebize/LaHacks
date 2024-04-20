import { api } from "../api";
import { AddPlantRequest, AddPlantResponce, GetUserResponse } from "./user.dto";

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
  }),
});

export const { useGetUserQuery, useAddPlantMutation } = userApi;
