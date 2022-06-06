import './projectsPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

function ProjectCard(props) {

  const projectCardAnim = {
    hidden: {
      opacity: 0,
      translateX: '100%',
      transition: {
        duration: 0.05
      }
    },
    visibleNoFilter: {
      opacity: 1,
      translateX: '0%',
      transition: {
        type: 'spring', 
        stiffness: 25,
        velocity: 5
      }
    },
    visibleFiltering: {
      opacity: 1,
      translateX: '0%',
      transition: {
        type: 'spring', 
        stiffness: 25,
        velocity: 5
      }
    },
    visibleFilteringMobile: {
      opacity: 1,
      translateX: '0%',
      transition: {
        type: 'spring', 
        stiffness: 25,
        velocity: 5
      }
    },
    exit: {
      opacity: 0,
      translateX: '-100%',
      transition: {
        duration: 0.05
      }
    }
  }
  
  return (
    <motion.li className='ProjectCardLI'
      variants={projectCardAnim}
      whileHover={{
        scale: 1.05,
        boxShadow: '9px 9px 7px 7px #B5B5B5',
        transition: {duration: 0.15}
      }}
    >
      <Link className="ProjectCard" to={"/project/"+props.url}>
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
    </motion.li>
  );
}

export default ProjectCard;