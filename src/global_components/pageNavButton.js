import { Link } from 'react-router-dom'

function PageNavButton(props) {

  // here get image based on arrow direction from props.direction

  return (
    <Link to={props.link} className="PageNavButton" onClick={props.hasFunc ? () => props.projectsAnim(props.animDir) : null}>
      <p>{props.location}{props.animDir}</p>
    </Link>
  );
}

export default PageNavButton;