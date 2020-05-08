import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Layout from "../../components/layout";
import { SITE_NAME, BASE_URL } from "../../lib/config";
import { formatDate } from "../../lib/utils";
import Header from "../../components/header";

const PostTemplate = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  // const keywords = post.keywords.join(", ");
  // console.log(post.keywords);

  return (
    <Layout>
      <Head>
        <meta name="author" content="Julian Jupiter" />
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content="" />
        <title>
          {SITE_NAME} - Blog - {post.title}
        </title>
        <link rel="shortcut icon" href="/assets/images/favicon.PNG" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/prismjs/themes/prism-tomorrow.css"
          rel="stylesheet"
        />
      </Head>
      <Header page="blog" />
      <section className="jumbotron text-center mb-0 rouded-0">
        <div className="container">
          <h1 className="jumbotron-heading font-weight-bold text-deep-orange">
            {post.title}
          </h1>
          <p className="lead text-muted mb-0">
            <info dateTime={post.date}>{formatDate(new Date(post.date))}</info>
            &nbsp;|&nbsp;
            <Link href={BASE_URL + "/blog/" + post.slug + "#disqus_thread"}>
              <a data-disqus-identifier={"/blog/" + post.slug}></a>
            </Link>
          </p>
        </div>
      </section>
      <section className="bg-white" style={{ padding: "4rem 2rem" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col text-justify" style={{ fontSize: "1.25rem" }}>
              <ReactMarkdown source={post.content} escapeHtml={false} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <hr />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col">
              <div id="disqus_thread" style={{ paddingTop: "4rem" }}></div>
              <script src="/assets/js/disqus.js"></script>
              <noscript>
                Please enable JavaScript to view the{" "}
                <a href="https://disqus.com/?ref_noscript" rel="nofollow">
                  comments powered by Disqus.
                </a>
              </noscript>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PostTemplate;

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "excerpt",
    "keywords",
    "date",
    "image",
    "slug",
    "content",
  ]);
  const content = post.content || "";

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  console.log(posts);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
