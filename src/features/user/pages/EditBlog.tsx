import { Link, useParams } from "react-router-dom";
import EditBlogForm from "../components/EditBlogForm";
import { useGetBlogByIdQuery } from "@/features/blogs/blogApi";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, FileSearch, RefreshCw } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, refetch } = useGetBlogByIdQuery(id ?? skipToken);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-7 w-7 text-destructive" />
          </div>

          <h2 className="text-xl font-semibold">Unable to load blog</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while fetching the blog. Please try again.
          </p>

          <Button
            onClick={() => refetch()}
            className="mt-6 w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FileSearch className="h-7 w-7 text-muted-foreground" />
          </div>

          <h2 className="text-xl font-semibold tracking-tight">
            Blog not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The blog you're looking for doesn't exist, may have been deleted,
            or the link is invalid.
          </p>

          <div className="mt-6">
            <Button asChild className="w-full">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Blogs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <EditBlogForm blog={data} />
    </div>
  )
}
