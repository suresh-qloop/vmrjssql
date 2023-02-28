import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            property="og:title"
            content="Market Research Reports, Industry Insights: Value Market Research"
          />
          <meta
            property="og:description"
            content="The Leading Market Research Reports provider - Value Market Research offers custom market analysis services with market growth prospects and forecasts."
          />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_URL}/dist/img/reports/report1.jpg`}
          />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}`} />
        </Head>
        <body
          className="hold-transition sidebar-mini layout-fixed"
          id="cust_sidebar"
        >
          <Main />
          <NextScript />
          <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/jquery/jquery.min.js`}
          />
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/jquery-ui/jquery-ui.min.js`}
          /> */}
          <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/bootstrap/js/bootstrap.bundle.min.js`}
          />
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/chart.js/Chart.min.js`}
          /> */}
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/sparklines/sparkline.js`}
          /> */}
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/jqvmap/jquery.vmap.min.js`}
          /> */}
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/jqvmap/maps/jquery.vmap.usa.js`}
          /> */}
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/jquery-knob/jquery.knob.min.js`}
          /> */}
          <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/moment/moment.min.js`}
          />
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/daterangepicker/daterangepicker.js`}
          /> */}
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js`}
          /> */}
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/summernote/summernote-bs4.min.js`}
          /> */}
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js`}
          /> */}
          <script src={`${process.env.NEXT_PUBLIC_URL}/dist/js/adminlte.js`} />
          {/* <script
            src={`${process.env.NEXT_PUBLIC_URL}/dist/js/pages/dashboard.js`}
          /> */}
          {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
