import Head from "next/head";
import Layout from "../../components/layout";
import { getProjects } from "../../lib/projects";
import Projects from "../../components/projects";

import { SITE_NAME } from "../../lib/config";
import Header from "../../components/header";

const ProjectsPage = ({ projects }) => {
  return (
    <Layout>
      <Head>
        <meta name="author" content="Julian Jupiter" />
        <meta name="description" content="Julian Jupiter's Projects" />
        <title>{SITE_NAME} - Projects</title>
        <link rel="shortcut icon" href="/assets/images/favicon.PNG" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header page="projects" />
      <section className="jumbotron text-center mb-0">
        <div className="container">
          <h1 className="text-deep-orange">Projects</h1>
          <p className="lead text-muted">
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don’t simply skip over it entirely.
          </p>
        </div>
      </section>
      <section className="album py-5 bg-light">
        <div className="container">
          <Projects data={projects} />
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;

export async function getStaticProps() {
  const projects = getProjects();
  return {
    props: { projects },
  };
}
