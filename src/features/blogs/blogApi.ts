import { mainApi } from "@/app/mainApi";
import type { Blog, BlogListResponse, } from "./schemas";


export const blogApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogListResponse, Object>({
      query: (query) => ({
        url: "/blogs",
        method: "GET",
        params: query,
      }),
      providesTags: ["Blog"],
    }),

    getUserBlogs: builder.query<Blog[], void>({
      query: () => '/users/blogs',
      providesTags: ["Blog"],
    }),

    getBlogById: builder.query<Blog, string>({
      query: (id) => `/blogs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Blog", id }],
    }),

    createBlog: builder.mutation<Blog, FormData>({
      query: (body) => ({
        url: "/blogs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation<
      Blog,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Blog",
        { type: "Blog", id },
      ],
    }),

    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetUserBlogsQuery,
} = blogApi;