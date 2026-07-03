import { base } from "@/app/mainApi";
import Loader from "@/components/Loader";
import { CalendarDays, User2 } from "lucide-react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../blogApi";

export default function Blog() {
  const { id } = useParams();

  const { data, isLoading, error } = useGetBlogByIdQuery(id!);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-2xl border p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold">Blog not found</h2>
          <p className="mt-2 text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="pb-20">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-14 text-center">
        <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-yellow-700">
          {data.category}
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {data.title}
        </h1>

        {data.subtitle && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {data.subtitle}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User2 className="h-4 w-4" />
            <span>{data.user?.fullname}</span>
          </div>

          {data.createdAt && (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <Moment format="MMMM DD, YYYY">
                {data.createdAt}
              </Moment>
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      <section className="mx-auto mt-12 max-w-6xl px-5">
        <img
          src={`${base}/${data.image}`}
          alt={data.title}
          className="aspect-video w-full rounded-3xl object-cover shadow-xl"
        />
      </section>

      {/* Content */}
      <section className="mx-auto mt-16 max-w-3xl px-5">
        <div
          className="
            prose
            prose-lg
            max-w-none
            prose-headings:font-bold
            prose-headings:text-foreground
            prose-p:text-muted-foreground
            prose-p:leading-8
            prose-img:rounded-xl
            prose-a:text-primary
            prose-blockquote:border-primary
            dark:prose-invert
          "
          dangerouslySetInnerHTML={{
            __html: data.description,
          }}
        />
      </section>
    </article>
  );
}