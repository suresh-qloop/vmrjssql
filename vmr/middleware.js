import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role

      // console.log(token, "middleware");
      // console.log(req.nextUrl.pathname, "path");

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
          // console.log(AdminRoles, "inner");
          return token?.role === 1;
        }
      }

      // for (let i = 0; i < UserRoles.length; i++) {
      //   if (req.nextUrl.pathname === UserRoles[i]) {
      //     console.log(UserRoles, "inner");
      //     return token?.role === "User";
      //   }
      // }

      if (req.nextUrl.pathname === "/admin/dashboard") {
        return token?.role === 2 || token?.role === 1;
      }

      // if (req.nextUrl.pathname === ["/user"]) {
      //   return token?.role === "User";
      // }

      // `/me` only requires the user to be logged in
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
