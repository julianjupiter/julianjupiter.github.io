const Projects = (props) => {
  const projects = props.data;
  return (
    <div className="row">
      {projects.map((project, i) => {
        return (
          <div className="col-md-4" key={i}>
            <div
              className="card mb-4 shadow-sm"
              style={{ borderRadius: ".625rem" }}
            >
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
              <div className="card-body" style={{ minHeight: "200px" }}>
                <h3>
                  <a href={project.website} className="text-deep-orange">
                    {project.name}
                  </a>
                </h3>
                <p className="card-text">{project.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
