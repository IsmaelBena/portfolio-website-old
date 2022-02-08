import './projectsPage.css';

function ProjectCard(props) {
  return (
    <div className="ProjectCard">
        <div className='CardNameField'>
            <p className='ProjectCardName'>{props.name}</p>
            <p className='ProjectCardField'>Field: {props.field}</p>
        </div>
        <ul className='CardAllTags'>
            {props.tags.map((tag, index) => (
                <li key={tag + index.toString()} className='ProjectCardTags'>{tag}</li>
            ))}
        </ul>
    </div>
  );
}

export default ProjectCard;