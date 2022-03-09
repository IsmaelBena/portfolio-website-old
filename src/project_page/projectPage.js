import PageNavButton from '../global_components/pageNavButton';
import './projectPage.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom'

function ProjectPage(props) {

  const location = useLocation();

  const [projectData, setProjectData] = useState()
  const [loadingData, setLoadingData] = useState(true)

  const getData = async () => {
    axios.get(`http://localhost:8000/projects${location.pathname}`).then(res => {
      console.log(res.status)
      console.log(location)
      setProjectData(res.data)
      console.log(res.data)
      setLoadingData(false)
    })
  }

  useEffect(() => {
    props.projectPageAnim("left");
    setLoadingData(true)
    getData();
  }, [])

  return (
    <motion.div 
    className="ProjectPage"
    initial={{ translateX: '100%', opacity: 0 }}
    animate={{ translateX: '0%', opacity: 1 }}
    exit={{ translateX: '100%', opacity: 0 }}
    transition={{ duration: 0.5 }}
    >
      <div className='BackBtnDiv'>
        <PageNavButton link="/projects" location="Projects" direction="left" hasFunc={false}/>
      </div>
      <div className='ProjectContent'>
        <div className='ProjectNameAndDescDiv'>
          <div className='ProjectName ContentBox'>
            {!loadingData ? <h1>{projectData.name}</h1> : <h1>loading data</h1>}
          </div>
          <div className='ProjectDescription ContentBox'>
          {!loadingData ?  <>{projectData.description.map((txt, index) => {
            if (txt.textType === "header") {
              return <h2 key={index}>{txt.text}</h2>
            }
            else if (txt.textType === "body") {
              return <p key={index}>{txt.text}</p>
            }
            else return <p>something went wrong</p>
            }) }</> : <h1>loading project description</h1>}
          </div>
        </div>
        <div className='ProjectTagsVidLinksDiv'>     
          <div className='ProjectTags ContentBox'>
            {!loadingData ? <> {projectData.tags.map((tag, index) => {
              return <p key={index}>{tag}</p>
            })}</> :
              <p>loading tags</p>
            }
          </div>
          <div className='ProjectVideo ContentBox'>
            {!loadingData ? <iframe width="400" 
                height="300" 
                src={projectData.video} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen="true">
              </iframe> :
                <p>loading tags</p>
            }
          </div>
          {!loadingData ? (projectData.otherLinks === undefined) ? null : <div className='ProjectLinks ContentBox'>
            {projectData.otherLinks.map((link, index) => {
            return <a href={link} target="_blank" key={index}>{link}</a>
          })} </div> :
          <div className='ProjectLinks ContentBox'>
              <p>loading links</p>
          </div>            
          }          
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectPage;