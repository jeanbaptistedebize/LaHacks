import { api } from "../api";
import { LoginRequest, RegisterRequest } from "./auth.dto";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<unknown, LoginRequest>({
      query: (body) => ({
        url: "/user/login",
        body,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    register: build.mutation<unknown, RegisterRequest>({
      query: (body) => ({
        url: "/user/register",
        body,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
