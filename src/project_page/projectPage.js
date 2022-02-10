import PageNavButton from '../global_components/pageNavButton';
import './projectPage.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

function ProjectPage(props) {

  useEffect(() => {
    props.projectPageAnim("left");
  }, []);

  return (
    <motion.div 
    className="ProjectPage"
    initial={{ translateX: '100%' }}
    animate={{ translateX: '0%' }}
    exit={{ translateX: '100%' }}
    transition={{ duration: 1 }}
    >
      <div className='BackBtnDiv'>
        <PageNavButton link="/projects" location="Projects" direction="left" hasFunc={false}/>
      </div>

      <div className='ProjectContent'>
        <div className='ProjectNameAndDescDiv'>
          <div className='ProjectName ContentBox'>
            <h1>Placeholder Project Name</h1>
          </div>
          <div className='ProjectDescription ContentBox'>

          </div>
        </div>
        <div className='ProjectTagsVidLinksDiv'>        
          <div className='ProjectTags ContentBox'></div>
          <div className='ProjectVideo ContentBox'></div>
          <div className='ProjectLinks ContentBox'></div>          
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectPage;