import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {toast} from "sonner"

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    // 1. Remove the auth token from cookies
    Cookies.remove("token");

    // 2. Refresh the current route to update server components/middleware
    router.refresh();

    toast.success('Logout Successfully')

    // 3. Redirect to the home page
    window.location.href = '/'
  };

  return { logout };
};