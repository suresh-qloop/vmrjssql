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
      // console.log(token);
      // const AdminRoles = [
      //   "/admin/users",
      //   "/admin/users/add",
      //   "/admin/users/change-password",
      //   "/admin/categories",
      //   "/admin/categories/add",
      //   "/admin/settings",
      //   "/admin/settings/add",
      // ];
      // const UserRoles = ["/admin/dashboard"];
      // const OperatorRoles = ["/admin/dashboard"];
      // const SEORoles = ["/admin/dashboard"];
      // const ContentRoles = ["/admin/dashboard"];
      // const JrAnalystRoles = ["/admin/dashboard"];
      // const SalesTeamRoles = ["/admin/dashboard"];

      // for (let i = 0; i < AdminRoles.length; i++) {
      //   if (req.nextUrl.pathname === AdminRoles[i]) {
      //     return token?.role === 1;
      //   }
      // }

      if (
        req.nextUrl.pathname === "/admin/dashboard" ||
        req.nextUrl.pathname === "/admin/users" ||
        req.nextUrl.pathname === "/admin/users/add" ||
        // req.nextUrl.pathname === "/admin/users/change-password" ||
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
  matcher: [
    // "/admin/dashboard",
    // "/admin/users",
    // "/admin/users/add",
    "/admin/users/change-password",
    // "/admin/users/edit/:path*",
    // "/admin/users/reset-password/:path*",
    // "/admin/categories",
    // "/admin/categories/add",
    // "/admin/categories/edit/:path*",
    // "/admin/categories/children/:path*",
    // "/admin/categories/children/add/:path*",
    "/admin/reports",
    // "/admin/reports/add",
    // "/admin/reports/edit/:path*",
    // "/admin/reports/view/:path*",
    // "/admin/reports/addfaqs/:path*",
    // "/admin/articles",
    // "/admin/articles/add",
    // "/admin/articles/edit/:path*",
    // "/admin/clients",
    // "/admin/clients/add",
    // "/admin/clients/edit/:path*",
    // "/admin/testimonials",
    // "/admin/testimonials/add",
    // "/admin/testimonials/edit/:path*",
    // "/admin/settings",
    // "/admin/settings/add",
    // "/admin/settings/edit/:path*",
    // "/admin/enquiries",
  ],
};
