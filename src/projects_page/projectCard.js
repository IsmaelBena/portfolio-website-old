import './projectsPage.css';
import { Link } from 'react-router-dom';

function ProjectCard(props) {
  return (
    <Link className="ProjectCard" to={"/project/"+props.url} onClick={() => props.projectsAnim("left")}>
        <div className='CardNameField'>
            <p className='ProjectCardName'>{props.name}</p>
            <p className='ProjectCardField'>Field: {props.field}</p>
        </div>
        <ul className='CardAllTags'>
            {props.tags.map((tag, index) => (
                <li key={tag + index.toString()} className='ProjectCardTags'>{tag}</li>
            ))}
        </ul>
    </Link>
  );
}

export default ProjectCard;