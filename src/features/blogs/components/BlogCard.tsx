import { base } from "@/app/mainApi";
import type { Blog } from "../blogApi";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const BlogCard = ({
  _id,
  title,
  description,
  category,
  image,
}: Blog) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/blog/${_id}`)}
      className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={`${base}/${image}`}
          alt={title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        <div
          className="line-clamp-3 text-sm leading-6 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-primary">
            Read More
          </span>

          <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;