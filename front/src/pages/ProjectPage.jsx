import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import useProject from "../hooks/useProject";
import { Project } from "../components/Project";

export const ProjectPage = () =>{

  //const params = useParams();
  //console.log(params);

  const { id } = useParams();
  const { project, loading, error} = useProject(id);

  if (loading) return <p>Cargando projects...</p>;
  if (error) return <ErrorMessage message={error} />;

    return (
      <section>
          <h1>ProjectPage</h1>
          {/* <p>aquí iría un project</p>  */}
          <Project project={project} />
      </section>
    )
  }
  
  
  