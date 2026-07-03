import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./components/layout/RootLayout"
import LoginPage from "./features/auth/pages/LoginPage"
import Home from "./features/home/Home"
import ProtectedRoute from "./routes/ProtectedRoute"
import AddBlog from "./features/blogs/pages/AddBlog"
import Blog from "./features/blogs/pages/Blog"
import UserBlogList from "./features/user/pages/UserBlogList"
import EditBlog from "./features/user/pages/EditBlog"
import RegisterPage from "./features/auth/pages/RegisterPage"
import LoggedInRoute from "./routes/LoggedInRoute"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <LoggedInRoute />,
          children: [
            {
              path: "login",
              element: <LoginPage />,
            },
            {
              path: "sign-up",
              element: <RegisterPage />,
            },
          ]
        },
        {
          path: "blog/:id",
          element: <Blog />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "add-blog",
              element: <AddBlog />,
            },
            {
              path: "edit-blog/:id",
              element: <EditBlog />,
            },
            {
              path: "user-blog-list",
              element: <UserBlogList />,
            }
          ]
        }
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App