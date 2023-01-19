import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const getTimestampInSeconds = () => {
        return Math.floor(Date.now() / 1000);
      };

      if (token) {
        if (token.expTime <= getTimestampInSeconds()) {
          return false;
        }
      }

      // const AdminRoles = [
      //   "/admin/users",
      //   "/admin/users/add",
      //   "/admin/users/change-password",
      //   "/admin/categories",
      //   "/admin/categories/add",
      //   "/admin/settings",
      //   "/admin/settings/add",
      // ];

      // for (let i = 0; i < AdminRoles.length; i++) {
      //   if (req.nextUrl.pathname === AdminRoles[i]) {
      //     return token?.role === 1;
      //   }
      // }

      if (
        req.nextUrl.pathname === "/admin/dashboard" ||
        req.nextUrl.pathname === "/admin/users" ||
        req.nextUrl.pathname === "/admin/users/add" ||
        req.nextUrl.pathname === "/admin/reports" ||
        req.nextUrl.pathname === "/admin/categories" ||
        req.nextUrl.pathname === "/admin/categories/add" ||
        req.nextUrl.pathname === "/admin/articles" ||
        req.nextUrl.pathname === "/admin/articles/add" ||
        req.nextUrl.pathname === "/admin/clients" ||
        req.nextUrl.pathname === "/admin/clients/add" ||
        req.nextUrl.pathname === "/admin/testimonials" ||
        req.nextUrl.pathname === "/admin/testimonials/add"
      ) {
        return token?.role === 1 || token?.role === 2;
      }

      if (req.nextUrl.pathname === "/admin/enquiries") {
        return token?.role === 1 || token?.role === 2 || token?.role === 12;
      }

      if (req.nextUrl.pathname === "/admin/seo_reports") {
        return token?.role === 1 || token?.role === 2 || token?.role === 3;
      }

      if (
        req.nextUrl.pathname === "/admin/reports" ||
        req.nextUrl.pathname === "/admin/reports/add"
      ) {
        return token?.role === 1 || token?.role === 2 || token?.role === 4;
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/users/change-password", "/admin/reports"],
};
