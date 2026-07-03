import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";
import { handleApiError } from "@/lib/error";
import { categories, type Blog } from "@/features/blogs/schemas";
import { useUpdateBlogMutation } from "@/features/blogs/blogApi";
import { updateblogSchema, type UpdateBlogSchema } from "../schemas";
import { base } from "@/app/mainApi";
import { useNavigate } from "react-router-dom";

export default function EditBlogForm({ blog }: { blog: Blog }) {
  const form = useForm<UpdateBlogSchema>({
    resolver: zodResolver(updateblogSchema),
    defaultValues: {
      title: blog.title,
      subtitle: blog.subtitle,
      description: blog.description,
      image: null,
      category: blog.category,
    },
  });

  const nav = useNavigate();

  const image = form.watch("image");
  const isImage =
    image instanceof File && image.type.startsWith("image/");

  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  async function onSubmit(data: UpdateBlogSchema) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (data.image) {
      formData.append("image", data.image);
    }
    try {
      await updateBlog({ id: blog._id, body: formData }).unwrap();
      toast.success("Blog updated successfully");
      nav(-1);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }

  return (
    <div className="mx-auto mt-10 flex w-full max-w-3xl justify-center px-4">
      <Card className="w-full mb-10">
        <CardHeader>
          <CardTitle>Add New Blog</CardTitle>
          <CardDescription>
            Fill in the information below to publish a new blog.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="blog-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title</FieldLabel>

                    <Input
                      {...field}
                      placeholder="Enter blog title"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Subtitle */}
              <Controller
                name="subtitle"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Subtitle</FieldLabel>

                    <Input
                      {...field}
                      placeholder="Enter subtitle"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category</FieldLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>

                          {categories.map((category) => (
                            <SelectItem
                              key={category}
                              value={category}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Featured Image</FieldLabel>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {isImage ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-1 h-48 w-full rounded-lg object-cover border"
                />
              ) : (
                blog.image && (
                  <img
                    src={`${base}/${blog.image}`}
                    alt={blog.title}
                    className="mt-2 h-48 w-full rounded-lg border object-cover"
                  />
                )
              )}

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>

                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write your blog content..."
                      className="bg-background [&_.ql-editor]:min-h-40"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            form="blog-form"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Publish Blog"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}