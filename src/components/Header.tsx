import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";
import DropdownMenuUser from "./DropDownUser";


export default function Header() {
  const { user } = useAuth();



  return (
    <header className="w-full py-5 border-b flex items-center justify-between">
      <div className="flex items-center gap-8">
        <NavLink to="/">
          <h1 className="text-3xl font-bold ">
            Blog
            <span className="text-yellow-500">App</span>
          </h1>
        </NavLink>
      </div>

      <nav className="flex items-center gap-2">
        {/* <div>
          <Link className={cn(buttonVariants({ variant: "ghost" }))} href="/blog">Blog</Link>
          <Link className={cn(buttonVariants({ variant: "ghost" }))} href="/create">Create</Link>
        </div> */}
        <div className="flex items-center gap-2">

          {user ?
            <div className="flex gap-5">
              <NavLink className={cn(buttonVariants({ variant: "ghost" }))} to="/add-blog">Create</NavLink>
              <DropdownMenuUser />
            </div>
            : <>
              <NavLink className={cn(buttonVariants({ variant: "outline" }))} to="/login">Login</NavLink>
              <NavLink className={cn(buttonVariants({ variant: "default" }))} to="/sign-up">Sign up</NavLink>

            </>}

          <ThemeToggle />
        </div>

      </nav>

    </header>
  )
}