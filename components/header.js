import Link from "next/link";
import { SITE_NAME, SITE_LOGO } from "../lib/config";

const SrOnly = (props) => {
  const menu = props.menu;
  const page = props.page;

  if (menu === page) {
    return (
      <>
        {" "}
        <span className="sr-only">(current)</span>
      </>
    );
  } else {
    return "";
  }
};

const Header = (props) => {
  const page = props.page;

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <img
                src={SITE_LOGO}
                alt={`${SITE_NAME}'s logo`}
                className="icon icon-lg"
                style={{
                  height: "45px",
                  border: "4px solid #fff",
                  borderRadius: "50%",
                }}
              />{" "}
              Julian Jupiter
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className={page === "home" ? "nav-item active" : "nav-item"}>
                <Link href="/">
                  <a className="nav-link">
                    Home
                    <SrOnly menu="home" page={page} />
                  </a>
                </Link>
              </li>
              <li
                className={page === "profile" ? "nav-item active" : "nav-item"}
              >
                <Link href="#">
                  <a className="nav-link">
                    Profile
                    <SrOnly menu="profile" page={page} />
                  </a>
                </Link>
              </li>
              <li className={page === "blog" ? "nav-item active" : "nav-item"}>
                <Link href="/blog">
                  <a className="nav-link">
                    Blog
                    <SrOnly menu="blog" page={page} />
                  </a>
                </Link>
              </li>
              <li
                className={page === "projects" ? "nav-item active" : "nav-item"}
              >
                <Link href="/projects">
                  <a className="nav-link">
                    Projects
                    <SrOnly menu="projects" page={page} />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
