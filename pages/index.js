import Head from "next/head";
import { getAllPosts } from "../lib/api";
import Layout from "../components/layout";
import { getProjects } from "../lib/projects";
import Projects from "../components/projects";
import LatestBlogs from "../components/latest-blogs";
import Cover from "../components/cover";
import Header from "../components/header";

const HomePage = ({ allPosts, projects }) => {
  return (
    <Layout>
      <Head>
        <meta name="author" content="Julian Jupiter" />
        <meta name="description" content="Julian Jupiter's website" />
        <title>Julian Jupiter</title>
        <link rel="shortcut icon" href="/assets/images/favicon.PNG" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header page="home" />
      <Cover />
      <LatestBlogs data={allPosts} count={5} />
      <section className="album py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col text-center">
              <h1 className="mt-5 mb-5 text-deep-orange font-weight-bold">
                Projects
              </h1>
            </div>
          </div>
          <Projects data={projects} />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

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
  const projects = getProjects();
  return {
    props: { allPosts, projects },
  };
}
