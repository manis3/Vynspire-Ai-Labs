"use client";

import { MoonIcon, SunIcon } from "@/assets/svgs";
import { useTheme } from "next-themes";
import { Button } from "../button";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { PUBLIC_ROUTE } from "@/enum/routes/authRoute";
import { PROTECTED_ROUTE } from "@/enum/routes/protectedRoute";

export default function ThemeToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const protectedRoutes = Object.values(PROTECTED_ROUTE);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("You have successfully logged out.");
    router.push(PUBLIC_ROUTE.LOGIN);
  };

  return (
    <div className="flex gap-6 justify-center items-center">
      {isProtectedRoute && (
        <Button variant="link" size="lg" onClick={handleLogout}>
          Logout
        </Button>
      )}

      <Button
        variant="outline"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-4 rounded-xl cursor-pointer border-none hover:opacity-80 transition shadow-lg"
      >
        {theme === "dark" ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
