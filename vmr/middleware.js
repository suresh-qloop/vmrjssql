import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const AdminRoles = [
        "/admin/users",
        "/admin/users/add",
        "/admin/categories",
        "/admin/categories/add",
        "/admin/reports",
        "/admin/reports/add",
        "/admin/articles",
        "/admin/articles/add",
      ];
      const UserRoles = ["/admin/dashboard"];

      for (let i = 0; i < AdminRoles.length; i++) {
        if (req.nextUrl.pathname === AdminRoles[i]) {
          return token?.role === 1;
        }
      }

      if (req.nextUrl.pathname === "/admin/dashboard") {
        return token?.role === 2 || token?.role === 1;
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/users",
    "/admin/users/add",
    "/admin/users/edit/:path*",
    "/admin/users/reset-password/:path*",
    "/admin/categories",
    "/admin/categories/add",
    "/admin/categories/edit/:path*",
    "/admin/reports",
    "/admin/reports/add",
    "/admin/reports/edit/:path*",
    "/admin/reports/view/:path*",
    "/admin/reports/addfaqs/:path*",
    "/admin/articles",
    "/admin/articles/add",
    "/admin/articles/edit/:path*",
  ],
};
