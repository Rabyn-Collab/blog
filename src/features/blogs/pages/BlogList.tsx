import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGetBlogsQuery } from "../blogApi";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { FieldError } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  query: z.string().min(1, "Search term is required"),
});

export default function BlogList() {

  const categories = ['All', 'Tech', 'Lifestyle', 'Travel', 'Food', 'Start up', 'Other'];
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const { data, isLoading, error, isFetching, refetch } = useGetBlogsQuery({
    page,
    search: search || (selectedCategory === "All" ? "" : selectedCategory),
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    setSearch(data.query);
    setPage(1);
  }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);



  return (
    <div>
      <form
        id="search-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden my-3"
      >
        <Controller
          name="query"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex-1">
              <input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Search for blogs"
                required
                autoComplete="off"
                className="w-full h-full pl-4 outline-none dark:bg-gray-800"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />

        <button
          type="submit"
          form="search-form"
          className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer dark:bg-gray-700"
        >
          Search
        </button>
      </form>
      <Tabs
        value={selectedCategory.toLowerCase()}
        onValueChange={(value) => {
          const category = categories.find(
            (c) => c.toLowerCase() === value
          )!;
          setSearch('');
          form.reset();
          setSelectedCategory(category);
          setPage(1);
        }}
        className="space-y-4"
      >

        <div className="w-full overflow-x-auto py-5">
          <div className="flex justify-start md:justify-center">
            <TabsList className="flex w-max gap-10 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category.toLowerCase()}
                  className="flex-none whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <TabsContent
          value={selectedCategory.toLowerCase()}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-10"
        >
          {isLoading || isFetching ? (
            Array.from({ length: 5 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : error ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <p className="text-destructive">Failed to load blogs.</p>
            </div>
          ) : data?.blogs.length ? (
            data.blogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-semibold">
                No blogs found
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                We couldn't find any blogs for the selected category. Try another category
                or refresh to fetch the latest posts.
              </p>

              <Button
                onClick={() => refetch()}
                variant="outline"
                className="mt-6"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          )}
        </TabsContent>
        {data && data.totalPages > 1 && (
          <Pagination className="mb-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: data.totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={page === pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    page < data.totalPages && setPage(page + 1)
                  }
                  className={
                    page === data.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Tabs>
    </div>
  );
}