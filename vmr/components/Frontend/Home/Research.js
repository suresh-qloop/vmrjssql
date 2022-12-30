export default function Research() {
  return (
    <div className="bg-white">
      <div className="container py-5 welcome_tab">
        <h3 className="text-center">
          Discover how Grand View Research can help your business:
        </h3>
        <div className="row mt-4  ">
          <div
            className="nav nav-tabs justify-content-center text-center"
            id="product-tab"
            role="tablist"
          >
            <a
              className="nav-item  nav-link active"
              id="compass"
              data-toggle="tab"
              href="#report-compass"
              role="tab"
              aria-controls="report-compass"
              aria-selected="false"
            >
              &nbsp;&nbsp;&nbsp;&nbsp; Compass &nbsp;&nbsp;&nbsp;&nbsp;
            </a>
            <a
              className="nav-item  nav-link"
              id="consulting"
              data-toggle="tab"
              href="#report-consulting"
              role="tab"
              aria-controls="report-consulting"
              aria-selected="false"
            >
              Consulting Services
            </a>
            <a
              className="nav-item nav-link"
              id="industry"
              data-toggle="tab"
              href="#report-industry"
              role="tab"
              aria-controls="report-industry"
              aria-selected="false"
            >
              Industry Reports
            </a>
            <a
              className="nav-item nav-link"
              id="engagement"
              data-toggle="tab"
              href="#report-engagement"
              role="tab"
              aria-controls="report-engagement"
              aria-selected="false"
            >
              Full Time Engagement
            </a>
            <a
              className="nav-item nav-link"
              id="research"
              data-toggle="tab"
              href="#report-research"
              role="tab"
              aria-controls="report-research"
              aria-selected="false"
            >
              Custom Research
            </a>
          </div>

          <div className="tab-content py-3" id="nav-tabContent">
            <div
              className="tab-pane fade active show"
              id="report-compass"
              role="tabpanel"
              aria-labelledby="compass"
            >
              <div className="row">
                <div className="col-md-7">
                  <h3 className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing:
                  </h3>

                  <ul
                    style={{ listStyleType: "none", paddingLeft: 0 }}
                    className="my-3 "
                  >
                    <li className="my-2">
                      <i className="fas fa-check mr-3 text-success"></i>
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </li>
                    <li className="my-2">
                      <i className="fas fa-check mr-3 text-success"></i>
                      Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </li>
                    <li className="my-2">
                      <i className="fas fa-check mr-3 text-success"></i>
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </li>
                    <li className="my-2">
                      <i className="fas fa-check mr-3 text-success"></i>
                      Lorem ipsum dolor, sit amet consectetur adipisicing.
                    </li>
                    <li className="my-2">
                      <i className="fas fa-check mr-3 text-success"></i>Lorem,
                      ipsum dolor sit amet consectetur adipisicing.
                    </li>
                    <li className="my-2">
                      <i className="fas fa-check mr-3 text-success"></i>
                      Lorem, ipsum dolor sit amet consectetur adipisicing.
                    </li>
                  </ul>
                  <button className="btn btn-info my-2">
                    Read Client Testimonials
                  </button>
                </div>
                <div className="col-md-5">
                  <img
                    src="/dist/img/report1.webp"
                    alt=""
                    className="mt-3 image3"
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="report-consulting"
              role="tabpanel"
              aria-labelledby="consulting"
            >
              <div className="row">
                <div className="col-md-7">
                  <h3 className="mt-2">Consulting Services</h3>

                  <p className="text-secondary pr-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium rem voluptatem, sunt perspiciatis laboriosam
                    dolorum quidem aut tempora, deleniti vel cum alias soluta
                    harum iste inventore suscipit mollitia ducimus quaerat
                    aperiam itaque repellendus nesciunt ut blanditiis. Amet
                    deleniti aut, placeat earum, incidunt quae, debitis sit
                    quisquam inventore temporibus atque velit.
                  </p>
                  <button className="btn btn-info my-2">Read More</button>
                </div>
                <div className="col-md-5">
                  <img
                    src="/dist/img/report2.webp"
                    alt=""
                    className="mt-3 image3"
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="report-industry"
              role="tabpanel"
              aria-labelledby="industry"
            >
              <div className="row">
                <div className="col-md-7">
                  <h3 className="mt-2">Industry Reports</h3>

                  <p className="text-secondary pr-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium rem voluptatem, sunt perspiciatis laboriosam
                    dolorum quidem aut tempora, deleniti vel cum alias soluta
                    harum iste inventore suscipit mollitia ducimus quaerat
                    aperiam itaque repellendus nesciunt ut blanditiis. Amet
                    deleniti aut, placeat earum, incidunt quae, debitis sit
                    quisquam inventore temporibus atque velit.
                  </p>
                  <button className="btn btn-info my-2">Read More</button>
                </div>
                <div className="col-md-5">
                  <img
                    src="/dist/img/report3.webp"
                    alt=""
                    className="mt-3 image3"
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="report-engagement"
              role="tabpanel"
              aria-labelledby="engagement"
            >
              <div className="row">
                <div className="col-md-7">
                  <h3 className="mt-2">Full Time Engagement Services</h3>

                  <p className="text-secondary pr-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium rem voluptatem, sunt perspiciatis laboriosam
                    dolorum quidem aut tempora, deleniti vel cum alias soluta
                    harum iste inventore suscipit mollitia ducimus quaerat
                    aperiam itaque repellendus nesciunt ut blanditiis. Amet
                    deleniti aut, placeat earum, incidunt quae, debitis sit
                    quisquam inventore temporibus atque velit.
                  </p>
                  <button className="btn btn-info my-2">Read More</button>
                </div>
                <div className="col-md-5">
                  <img
                    src="/dist/img/report4.webp"
                    alt=""
                    className="mt-3 image3"
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="report-research"
              role="tabpanel"
              aria-labelledby="research"
            >
              <div className="row">
                <div className="col-md-7">
                  <h3 className="mt-2">Custom Research Services</h3>

                  <p className="text-secondary pr-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium rem voluptatem, sunt perspiciatis laboriosam
                    dolorum quidem aut tempora, deleniti vel cum alias soluta
                    harum iste inventore suscipit mollitia ducimus quaerat
                    aperiam itaque repellendus nesciunt ut blanditiis. Amet
                    deleniti aut, placeat earum, incidunt quae, debitis sit
                    quisquam inventore temporibus atque velit.
                  </p>
                  <button className="btn btn-info my-2">Read More</button>
                </div>
                <div className="col-md-5">
                  <img
                    src="/dist/img/report5.webp"
                    alt=""
                    className="mt-3 image3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
