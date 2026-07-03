import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ApiErrorResponse = {
  message?: string;
};

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function handleApiError(error: unknown): string {
  if (!isFetchBaseQueryError(error)) {
    return "Something went wrong";
  }

  const data = error.data as ApiErrorResponse | undefined;

  switch (error.status) {
    case 400:
      return data?.message || "Bad Request";
    case 401:
      return data?.message || "Unauthorized";
    case 403:
      return data?.message || "Forbidden";
    case 404:
      return data?.message || "Not Found";
    case 500:
      return data?.message || "Internal Server Error";
    default:
      return data?.message || "Something went wrong";
  }
}