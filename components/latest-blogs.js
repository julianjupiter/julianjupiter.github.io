import Link from "next/link";
import { formatDate } from "../lib/utils";

const MoreBlogs = (props) => {
  const size = props.size;
  const count = props.count;
  if (size > count) {
    return (
      <div className="row justify-content-center">
        <div className="col text-center">
          <a href="/blog">
            <button className="btn btn-primary mt-1 mb-5">More Blogs</button>
          </a>
        </div>
      </div>
    );
  }

  return "";
};

const LatestBlogs = (props) => {
  const allPosts = props.data;
  const count = props.count;
  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col text-center">
            <h1 className="mt-5 mb-5 text-deep-orange font-weight-bold">
              Latest Blogs
            </h1>
          </div>
        </div>
        {allPosts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, count)
          .map((post, i) => {
            const coverPath = post.image.cover;
            let thumbnail = {};
            if (coverPath === "") {
              thumbnail = (
                <div className="col-md-6">
                  <Link href={"/blog/" + post.slug}>
                    <a>
                      <svg
                        className="bd-placeholder-img card-img-top"
                        style={{
                          borderRadius: "calc(0.625rem - 1px)",
                        }}
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                      >
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#ff5722"></rect>
                      </svg>
                    </a>
                  </Link>
                </div>
              );
            } else {
              thumbnail = (
                <div className="col-md-6">
                  <Link href={"/blog/" + post.slug}>
                    <a>
                      <img
                        src={coverPath}
                        alt={post.title}
                        className="img-fluid border mb-3"
                        style={{
                          maxHeight: "300px",
                          borderRadius: "calc(0.625rem - 1px)",
                        }}
                      />
                    </a>
                  </Link>
                </div>
              );
            }

            return (
              <div className="row mb-5" key={i}>
                {thumbnail}
                <div className="col-md-6">
                  <div className="row justify-content-center">
                    <div className="col-xl-9 col-lg-10">
                      <Link href={"/blog/" + post.slug}>
                        <a className="text-decoration-none">
                          <h3 className="text-deep-orange">{post.title}</h3>
                        </a>
                      </Link>
                      <p className="lead">{post.excerpt}</p>
                      <ul className="list-unstyled my-3">
                        <li className="d-flex align-items-center my-2">
                          <svg
                            className="bi bi-calendar"
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="h6 mb-0 ml-2">
                            {formatDate(new Date(post.date))}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <MoreBlogs size={allPosts.length} count={count} />
      </div>
    </section>
  );
};

export default LatestBlogs;
