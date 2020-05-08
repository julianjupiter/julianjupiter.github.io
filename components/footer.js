import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faGitlab,
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { SITE_NAME, BASE_URL, SITE_LOGO } from "../lib/config";

const Footer = () => (
  <footer className="text-white bg-deep-orange" style={{ padding: "6rem 0" }}>
    <div className="container">
      <div className="row mb-4 justify-content-center">
        <div className="col-auto">
          <a href="index.html">
            <img
              src={SITE_LOGO}
              alt={`${SITE_NAME}'s logo`}
              className="icon icon-lg"
              style={{
                height: "100px",
                border: "10px solid #fff",
                borderRadius: "50%",
              }}
            />
          </a>
        </div>
      </div>
      <div className="row justify-content-center mb-2">
        <div className="col-auto">
          <ul className="nav">
            <li className="nav-item">
              <Link href={`${BASE_URL}/`}>
                <a
                  className="nav-link text-white font-weight-bold"
                  target="_blank"
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`${BASE_URL}/priofile`}>
                <a
                  className="nav-link text-white font-weight-bold"
                  target="_blank"
                >
                  Profile
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`${BASE_URL}/blog`}>
                <a
                  className="nav-link text-white font-weight-bold"
                  target="_blank"
                >
                  Blog
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`${BASE_URL}/projects`}>
                <a
                  className="nav-link text-white font-weight-bold"
                  target="_blank"
                >
                  Projects
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="row justify-content-center mb-2">
        <div className="col-auto">
          <ul className="nav">
            <li className="nav-item">
              <Link href="https://github.com/julianjupiter">
                <a className="nav-link" target="_blank">
                  <FontAwesomeIcon
                    icon={faGithubSquare}
                    className="text-white"
                    style={{ flexShrink: "0", width: "auto", height: "4rem" }}
                  />
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="https://gitlab.com/julianjupiter">
                <a className="nav-link" target="_blank">
                  <FontAwesomeIcon
                    icon={faGitlab}
                    className="text-white"
                    style={{ flexShrink: "0", width: "auto", height: "4rem" }}
                  />
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="https://www.fcaebook.com/julianjupiter">
                <a className="nav-link" target="_blank">
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className="text-white"
                    style={{ flexShrink: "0", width: "auto", height: "4rem" }}
                  />
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="https://twitter.com/julianvjupiter">
                <a className="nav-link" target="_blank">
                  <FontAwesomeIcon
                    icon={faTwitterSquare}
                    className="text-white"
                    style={{ flexShrink: "0", width: "auto", height: "4rem" }}
                  />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col col-md-auto text-center">
          <small className="text-white">
            Copyright &copy;{" "}
            <span id="currentYear">{new Date().getFullYear()}</span>{" "}
            <Link href={`${BASE_URL}/`}>
              <a className="text-white">{SITE_NAME}</a>
            </Link>
            <p>All Rights Reserved</p>
          </small>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
