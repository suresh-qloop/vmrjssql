import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/plugins/fontawesome-free/css/all.min.css";
import "../public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "../public/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "../public/plugins/jqvmap/jqvmap.min.css";
import "../public/dist/css/adminlte.min.css";
import "../public/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "../public/plugins/daterangepicker/daterangepicker.css";
import "../public/plugins/summernote/summernote-bs4.css";
import "../style/style.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
// import "../public/fonts/ITC Franklin Gothic Std/ITC Franklin Gothic Std Heavy";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/dist/img/favicon.ico"
        />
        <meta
          name="keywords"
          content="Market Research Reports, Business Research, Industry Analysis, Market Insights, Syndicate Research Reports, Customized Research Reports, Business Consulting, VMR, VMR Reports, Industry Reports, Best market Research Company, Market Research Reports Provider, Research Reports company, Market Report Company"
        />
        <meta
          name="description"
          content="The Leading Market Research Reports provider - Value Market Research offers custom market analysis services with market growth prospects and forecasts."
        ></meta>

        <title>
          Market Research Reports, Industry Insights: Value Market Research
        </title>
      </Head>

      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </SessionProvider>
    </>
  );
}

export default MyApp;
