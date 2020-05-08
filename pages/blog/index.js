import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../../lib/api";
import Layout from "../../components/layout";
import { SITE_NAME } from "../../lib/config";
import { formatDate } from "../../lib/utils";
import Header from "../../components/header";

const Thumbnail = (props) => {
  const path = props.path;
  if (path === "") {
    return (
      <svg
        className="bd-placeholder-img card-img-top"
        style={{
          borderTopLeftRadius: "calc(0.625rem - 1px)",
          borderTopRightRadius: "calc(0.625rem - 1px)",
        }}
        width="100%"
        height="225"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: Thumbnail"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#ff5722"></rect>
      </svg>
    );
  } else {
    return (
      <img
        src={path}
        width="100%"
        height="225"
        style={{
          borderTopLeftRadius: "calc(0.625rem - 1px)",
          borderTopRightRadius: "calc(0.625rem - 1px)",
        }}
      />
    );
  }
};

const BlogPage = ({ allPosts }) => {
  return (
    <Layout>
      <Head>
        <meta name="author" content="Julian Jupiter" />
        <meta name="description" content="Julian Jupiter's Blog" />
        <title>{SITE_NAME} - Blog</title>
        <link rel="shortcut icon" href="/assets/images/favicon.PNG" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header page="blog" />
      <section className="jumbotron text-center mb-0">
        <div className="container">
          <h1 className="text-deep-orange">Blog</h1>
          <p className="lead text-muted">
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don’t simply skip over it entirely.
          </p>
        </div>
      </section>
      <section className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {allPosts
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post, i) => {
                return (
                  <div className="col-md-4" key={i}>
                    <div
                      className="card mb-4 shadow-sm"
                      style={{ borderRadius: ".625rem" }}
                    >
                      <Thumbnail path={post.image.cover} />
                      <div className="card-body" style={{ minHeight: "250px" }}>
                        <h3>
                          <a href={"/blog/" + post.slug}>{post.title}</a>
                        </h3>
                        <p>{formatDate(new Date(post.date))}</p>
                        <p className="card-text">{post.excerpt}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "excerpt",
    "keywords",
    "date",
    "image",
    "slug",
    "content",
  ]);
  return {
    props: { allPosts },
  };
}
