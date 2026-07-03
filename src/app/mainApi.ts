import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";


export const base = 'http://localhost:5000';

export const baseUrl = 'http://localhost:5000/api';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },

  }),
  tagTypes: ['Blog'],
  endpoints: () => ({})
})
