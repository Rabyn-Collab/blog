import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import {
  Search,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Pencil,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import Loader from "@/components/Loader";
import type { Blog } from "@/features/blogs/schemas";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { base } from "@/app/mainApi";
import Moment from "react-moment";
import { useGetUserBlogsQuery } from "@/features/blogs/blogApi";
import RemoveBlog from "../components/RemoveBlog";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper<Blog>();

const columns = (navigate: ReturnType<typeof useNavigate>) => [
  columnHelper.display({
    id: "image",
    header: "",
    cell: ({ row }) => (
      <Avatar className="h-10 w-10 rounded-lg ring-1 ring-black/5 dark:ring-white/10">
        <AvatarImage
          src={`${base}/${row.original.image}`}
          className="object-cover"
        />
        <AvatarFallback className="rounded-lg bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          {row.original.title.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
  }),

  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <div className="max-w-xs truncate font-medium text-slate-900 dark:text-slate-100">
        {info.getValue()}
      </div>
    ),
  }),

  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        <Moment format="MMMM DD, YYYY">
          {info.getValue()}
        </Moment>
      </div>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <Button
          onClick={() => navigate(`/edit-blog/${row.original._id}`)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
          aria-label="Edit blog"
        >
          <Pencil size={15} />
        </Button>
        <RemoveBlog blogId={row.original._id} />
      </div>
    ),
  }),
];

export default function UserBlogList() {
  const { data, isLoading } = useGetUserBlogsQuery();
  const nav = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");


  const table = useReactTable({
    data: data ?? [],
    columns: columns(nav),
    state: {
      sorting,
      globalFilter,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    globalFilterFn: "includesString",
  });

  if (isLoading) return <Loader />;

  const totalRows = table.getFilteredRowModel().rows.length;
  const rows = table.getRowModel().rows;
  const hasAnyData = (data ?? []).length > 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 mb-16 mt-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Your blogs
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {totalRows} {totalRows === 1 ? "post" : "posts"}
            {globalFilter && ` matching "${globalFilter}"`}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            size={17}
          />
          <input
            placeholder="Search blogs..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
            <thead className="bg-slate-50/80 dark:bg-slate-800/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sortState = header.column.getIsSorted();
                    const sortable = header.column.getCanSort();
                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 ${sortable
                          ? "cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200"
                          : ""
                          }`}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-1.5">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {sortable && (
                              <span className="text-slate-400 dark:text-slate-500">
                                {sortState === "asc" ? (
                                  <ArrowUp
                                    size={13}
                                    className="text-emerald-600 dark:text-emerald-400"
                                  />
                                ) : sortState === "desc" ? (
                                  <ArrowDown
                                    size={13}
                                    className="text-emerald-600 dark:text-emerald-400"
                                  />
                                ) : (
                                  <ChevronsUpDown size={13} />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.length ? (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-3.5 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="rounded-full bg-slate-50 p-4 ring-1 ring-slate-100 dark:bg-slate-800/60 dark:ring-slate-700">
                        {hasAnyData ? (
                          <FileText
                            className="text-slate-400 dark:text-slate-500"
                            size={28}
                          />
                        ) : (
                          <BookOpen
                            className="text-slate-400 dark:text-slate-500"
                            size={28}
                          />
                        )}
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {hasAnyData ? "No matching blogs" : "No blogs yet"}
                      </h3>
                      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                        {hasAnyData
                          ? "Try a different search term or clear the search."
                          : "Blogs you publish will show up here."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {rows.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page{" "}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {table.getPageCount()}
            </span>
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="gap-1 text-slate-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ChevronLeft size={15} />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="gap-1 text-slate-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Next
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}