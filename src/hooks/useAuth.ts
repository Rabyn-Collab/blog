import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { removeUser, setUser } from "@/features/auth/authSlice";
import type { LoginSchema } from "@/features/auth/schemas";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error";

export const useAuth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const [loginMutation, loginState] = useLoginMutation();

  const login = async (data: LoginSchema) => {

    try {
      const response = await loginMutation(data).unwrap();

      dispatch(
        setUser(response)
      );
      toast.success("Login successful");
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(handleApiError(err));
    }

  };

  const signOut = () => {
    dispatch(removeUser());
    navigate(-1);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout: signOut,
    isLoading: loginState.isLoading,
    error: loginState.error,
  };
};