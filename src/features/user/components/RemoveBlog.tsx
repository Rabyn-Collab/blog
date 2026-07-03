import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useDeleteBlogMutation } from "@/features/blogs/blogApi"
import { handleApiError } from "@/lib/error"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"


interface RemoveBlogProps {
  blogId: string
}


export default function RemoveBlog({ blogId }: RemoveBlogProps) {
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
  const handleDelete = async () => {
    try {
      await deleteBlog(blogId).unwrap()
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isLoading}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          aria-label="Delete blog"
        >
          {isLoading ? <Spinner /> : <Trash2 size={15} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
