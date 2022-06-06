import './projectsPage.css';
import { animate, AnimatePresence, motion } from 'framer-motion';
import PageNavButton from '../global_components/pageNavButton';
import FilterTab from './filterTab';
import { useEffect, useState } from 'react';
import ProjectCard from './projectCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../global_components/NavBar';
import { useMediaPredicate } from "react-media-hook";


function ProjectsPage(props) {

  const desktop = useMediaPredicate("(min-width: 820px)");

  const [projectPageData, setProjectPageData] = useState()
  const [loadingData, setLoadingData] = useState(true)

  const getData = async () => {
    axios.get('http://localhost:8000/projects/cards').then(res => {
      console.log(res.status)
      setProjectPageData(res.data)
      setLoadingData(false)
    })
  }

  useEffect(() => {
    props.setNavBarEntryAnim(false)
    getData();
  }, [])

  const [filtering, setFiltering] = useState(false);

  const [methodOfFilter, setMethodOfFilter] = useState("and");
  const [fieldsSelected, setFieldsSelected] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  const updateFilterData = (filterMethod, fields, tags) => {
    setMethodOfFilter(filterMethod);
    setFieldsSelected(fields);
    setTagsSelected(tags)
  }

  function toggleActive() {
    setFiltering(!filtering);
    console.log(filtering);
  }

  let filteredProjectData = [];

  const orFilterProjectData = () => {
    filteredProjectData = [];
    if (fieldsSelected.length === 0 && tagsSelected.length === 0) {
      filteredProjectData = projectPageData.cardsData
    }
    else if (fieldsSelected.length === 0) {
      projectPageData.cardsData.map((cardData) => {
        for (let i = 0; i < tagsSelected.length; i++) {
          if (cardData.tags.includes(tagsSelected[i])) {
            filteredProjectData.push(cardData);
            break;
          }
        }
      })
    }
    else if (tagsSelected.length === 0) {
      projectPageData.cardsData.map((cardData) => {
        for (let i = 0; i < fieldsSelected.length; i++) {
          if (cardData.field.includes(fieldsSelected[i])) {
            filteredProjectData.push(cardData);
            break;
          }
        }
      })
    }
    else {
      projectPageData.cardsData.map((cardData) => {
        for (let i = 0; i < fieldsSelected.length; i++) {
          if (cardData.field.includes(fieldsSelected[i])) {
            filteredProjectData.push(cardData);
            break;
          }
        }
      });
      projectPageData.cardsData.map((cardData) => {
        if (!filteredProjectData.includes(cardData)) 
        for (let i = 0; i < tagsSelected.length; i++) {
          if (cardData.tags.includes(tagsSelected[i])) {
            filteredProjectData.push(cardData);
            break;
          }
        }
      })
    }
  }

  const andFilterProjectData = () => {
    filteredProjectData = [];
    if (fieldsSelected.length === 0 && tagsSelected.length === 0) {
      filteredProjectData = projectPageData.cardsData
    }
    else if (fieldsSelected.length === 0) {
      projectPageData.cardsData.map((cardData) => {
        for (let i = 0; i <= tagsSelected.length; i++) {
          if (i === tagsSelected.length) {
            filteredProjectData.push(cardData);
          }
          else if (!cardData.tags.includes(tagsSelected[i])) break;
          else continue;
        }
      });
    }
    else if (tagsSelected.length === 0) {
      projectPageData.cardsData.map((cardData) => {
        for (let i = 0; i <= fieldsSelected.length; i++) {
          if (i === fieldsSelected.length) {
            filteredProjectData.push(cardData);
          }
          else if (!cardData.field.includes(fieldsSelected[i])) break;
          else continue;
        }
      });
    }
    else {
      let tempFilteredData = [];
      projectPageData.cardsData.map((cardData) => {
        for (let i = 0; i <= fieldsSelected.length; i++) {
          if (i === fieldsSelected.length) {
            tempFilteredData.push(cardData);
          }
          else if (!cardData.field.includes(fieldsSelected[i])) break;
          else continue;
        }
      });
      tempFilteredData.map((cardData) => {
        for (let i = 0; i <= tagsSelected.length; i++) {
          if (i === tagsSelected.length) {
            filteredProjectData.push(cardData);
          }
          else if (!cardData.tags.includes(tagsSelected[i])) break;
          else continue;
        }
      });
    }
  }

  const displayProjectCards = () => {
    if (methodOfFilter === "and")
    {
      andFilterProjectData();
    }
    else if (methodOfFilter === "or")
    {
      orFilterProjectData();
    }
    return <>
      {filteredProjectData.map((card) => 
        <ProjectCard name={card.name} field={card.field} tags={card.tags} url={card.url}/>
      )}
    </>
  }

  const projectContainerAnim = {
    hidden: {
      opacity: 0,
      marginLeft: '50px',
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.25
      }
    },
    visibleNoFilter: {
      opacity: 1,
      marginLeft: '50px',
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.5,
        duration: 0.5
      }
    },
    visibleFiltering: {
      opacity: 1,
      marginLeft: '350px',
      transition: {
        delayChildren: 1,
        staggerChildren: 0.5,
        duration: 0.5
      }
    },
    visibleFilteringMobile: {
      opacity: 1,
      marginLeft: '50px',
      transition: {
        delayChildren: 1,
        staggerChildren: 0.5,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      translateX: "-100%"
    }
  };

  const cardsContainerState = (isDesktop, isFiltering) => {
    if (!isDesktop && isFiltering) return "visibleFilteringMobile";
    else if (isFiltering) return "visibleFiltering";
    else return "visibleNoFilter";
  }

  return (
    <motion.div className="ProjectsPage">
      <NavBar navBarEntryAnim={props.navBarEntryAnim} showFilterBar={true} pageHeader="Projects" redirectLocation="/" exitAnim={false} filtering={filtering} toggleActive={toggleActive} loadingData={loadingData} />
      <div className='ProjectsPageContent'>
        {!loadingData ? 
        <>
          <FilterTab active={filtering} toggleActive={toggleActive} filterData={projectPageData.filterData} updateFilterData={updateFilterData}/>
          <motion.ul className='ProjectCardsContainer'
            variants={projectContainerAnim}
            initial="hidden"
            animate={cardsContainerState(desktop, filtering)}
          >
              {displayProjectCards()}
          </motion.ul>
        </> :
        <motion.h1 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 3}}
        >Loading Projects</motion.h1>
        }
      </div>
    </motion.div>
  );
}

export default ProjectsPage;