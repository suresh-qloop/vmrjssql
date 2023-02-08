import axios from "axios";
import { urlString } from "../utils/urlString";
//pages/sitemap.xml.js
const REPORTS_DATA_URL = `${process.env.NEXT_PUBLIC_URL}/report`;
const PRESSRELEASES_DATA_URL = `${process.env.NEXT_PUBLIC_URL}/pressreleases`;
const ANALYSIS_DATA_URL = `${process.env.NEXT_PUBLIC_URL}/analysis`;

function generateSiteMap(categories, reports, pressreleases, analysis) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${process.env.NEXT_PUBLIC_URL}</loc>
     </url>
     ${categories
       .map(({ name }) => {
         return `
      <url>
          <loc>${`${process.env.NEXT_PUBLIC_URL}/industries/${urlString(
            name
          )}`}</loc>
      </url>
    `;
       })
       .join("")}
     <url>
     <loc>${process.env.NEXT_PUBLIC_URL}/reports</loc>
   </url>
     ${reports
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${REPORTS_DATA_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}

       ${pressreleases
         .map(({ slug }) => {
           return `
        <url>
            <loc>${`${PRESSRELEASES_DATA_URL}/${slug}`}</loc>
        </url>
      `;
         })
         .join("")}
         <url>
         <loc>${process.env.NEXT_PUBLIC_URL}/analysis</loc>
       </url>
         ${analysis
           .map(({ slug }) => {
             return `
         <url>
             <loc>${`${ANALYSIS_DATA_URL}/${slug}`}</loc>
         </url>
       `;
           })
           .join("")}
           <url>
           <loc>${process.env.NEXT_PUBLIC_URL}/privacy-policy</loc>
         </url>
         <url>
         <loc>${process.env.NEXT_PUBLIC_URL}/refund-policy</loc>
       </url>
       <url>
       <loc>${process.env.NEXT_PUBLIC_URL}/terms-and-conditions</loc>
     </url>
     <url>
     <loc>${process.env.NEXT_PUBLIC_URL}/faq</loc>
   </url>
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/categories`
  );
  const categories = await req.data;
  const request = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/all-reports`
  );
  const reports = await request.data;
  const request2 = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/all-pressreleases`
  );
  const pressreleases = await request2.data;
  const request3 = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/all-analysis`
  );
  const analysis = await request3.data;

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(categories, reports, pressreleases, analysis);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
