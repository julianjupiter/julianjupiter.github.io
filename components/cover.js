import { SITE_NAME, TAGLINE, BG_COVER } from "../lib/config";

const Cover = () => (
  <section
    className="bg-deep-orange"
    style={{
      backgroundImage: `url(${BG_COVER})`,
      backgroundSize: "contain",
      backgroundPosition: "right bottom",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="rounded-0" style={{ padding: "4rem 2rem" }}>
      <div className="container">
        <div
          className="row text-center align-items-center"
          style={{ minHeight: "20vw" }}
        >
          <div className="col">
            <h1
              className="text-white font-weight-bold"
              style={{ fontSize: "5rem" }}
            >
              {SITE_NAME}
            </h1>
            <p
              className="lead text-white font-weight-bold"
              style={{ fontSize: "2rem" }}
            >
              {TAGLINE}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Cover;
