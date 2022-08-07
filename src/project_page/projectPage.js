import PageNavButton from '../global_components/pageNavButton';
import './projectPage.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
import NavBar from '../global_components/NavBar';
import { useMediaPredicate } from "react-media-hook";

function ProjectPage(props) {

  const location = useLocation();
  const desktop = useMediaPredicate("(min-width: 1050px)");

  const [projectData, setProjectData] = useState()
  const [loadingData, setLoadingData] = useState(true)

  const [singleCol, setSingleCol] = useState(false)

  const getData = async () => {
    axios.get(`http://localhost:8000/projects${location.pathname}`).then(res => {
      console.log(res.status);
      console.log(location);
      setProjectData(res.data);
      console.log(res.data);
      setLoadingData(false);
      if (res.data.otherLinks.length < 1 && !("video" in projectData)) {setSingleCol(true)};
    })
  }

  useEffect(() => {
    console.log(props.navBarEntryAnim)
    props.setNavBarEntryAnim(false)
    desktop ? setSingleCol(false) : setSingleCol(true)
    getData();
  }, [])

  useEffect(() => {
    desktop ? setSingleCol(false) : setSingleCol(true)
  }, [desktop])

  return (
    <motion.div className="ProjectPage">
      <NavBar navBarEntryAnim={props.navBarEntryAnim} showFilterBar={false} projectProgress={loadingData ? "Loading Project Progress" : projectData.progress} pageHeader={loadingData ? "Loading Project Name" : projectData.name} redirectLocation="/projects" exitAnim={false}/>
      {
        !loadingData ? 
        <motion.div 
        className='ProjectContent'
        initial={{ translateX: '25%', opacity: 0 }}
        animate={{ translateX: '0%', opacity: 1 }}
        exit={{ translateX: '25%', opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
          { singleCol ? <>
            <div className='singleCol'>
              <div className='ProjectDescription'>
                <>{projectData.description.map((txt, index) => {
                if (txt.textType === "header") {
                  return <h3 className='DescHeader' key={index}>{txt.text}</h3>
                }
                else if (txt.textType === "body") {
                  return <p className='DescBody' key={index}>{txt.text}</p>
                }
                else return <p>something went wrong</p>
                }) }</>
              </div>
              {!("video" in projectData) ? null :
                <div className='ProjectVideo'>
                  <iframe width="348" 
                    height="261"
                    src={projectData.video} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen="true">
                  </iframe>
                </div>}
                <div className='ProjectTags'>
                  <>{projectData.tags.map((tag, index) => {
                    return <p className='Tag' key={index}>{tag}</p>
                  })}</>
                </div>
                {(projectData.otherLinks.length < 1) ? null :
                  <div className='ProjectLinks'>
                    <h3>Other Projects Links:</h3>
                    <>{projectData.otherLinks.map((link, index) => {
                      return <a href={link} target="_blank" key={index}>{link}</a>
                    })}</>
                  </div>          
                }
            </div>
          </> : 
          <div className='doubleColContainer'>
            <div className='leftCol'>
              <div className='ProjectDescription'>
                  <>{projectData.description.map((txt, index) => {
                  if (txt.textType === "header") {
                    return <h3 className='DescHeader' key={index}>{txt.text}</h3>
                  }
                  else if (txt.textType === "body") {
                    return <p className='DescBody' key={index}>{txt.text}</p>
                  }
                  else return <p>something went wrong</p>
                  }) }</>
                </div>
            </div>
            <div className='rightCol'>
              {!("video" in projectData) ? null :
                <div className='ProjectVideo'>
                  <iframe width="400" 
                    height="300" 
                    src={projectData.video} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen="true">
                  </iframe>
                </div>
              }
              <div className='ProjectTags'>
                <>{projectData.tags.map((tag, index) => {
                  return <p className='Tag' key={index}>{tag}</p>
                })}</>
              </div>
              {(projectData.otherLinks.length < 1) ? null :
                  <div className='ProjectLinks'>
                    <h3>Other Projects Links:</h3>
                    <>{projectData.otherLinks.map((link, index) => {
                      return <a href={link} target="_blank" key={index}>{link}</a>
                    })}
                    </>
                  </div>          
                }
            </div>
          </div>
          }
        </motion.div>
        : <h1>Loading project data</h1>
      }
    </motion.div>
  );
}

export default ProjectPage;