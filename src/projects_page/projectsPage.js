import './projectsPage.css';
import { motion } from 'framer-motion';
import PageNavButton from '../global_components/pageNavButton';
import FilterTab from './filterTab';
import { useEffect, useState } from 'react';
import ProjectCard from './projectCard';
import axios from 'axios';


function ProjectsPage(props) {

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
    setLoadingData(true)
    getData();
  }, [])

  const [filtering, setFiltering] = useState(false);

  const [methodOfFilter, setMethodOfFilter] = useState("and");
  const [fieldsSelected, setFieldsSelected] = useState(["fullstack"]);
  const [tagsSelected, setTagsSelected] = useState(["API"]);

  const updateFilterData = (filterMethod, fields, tags) => {
    setMethodOfFilter(filterMethod);
    setFieldsSelected(fields);
    setTagsSelected(tags)
  }

  function toggleActive() {
    setFiltering(!filtering);
    console.log(filtering);
  }

  // Make request to API for project cards content and url and filter content
  /*let projectPageData = {
    cardsData: [{name: "Full Project Name blah blah blah blah", url: "game-project", field: "game-dev", tags: ["Unity", "C#"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "SQL"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API"]},
      {name: "Full Project 2 Name", field: "fullstack", url: "fullstack-project", tags: ["JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API"]}],
    filterData: {
      fields: ["fullstack", "game-dev"],
      tags: ["Unity", "C#", "JavaScript", "TypeScript", "ReactJS", "NodeJS", "ExpressJS", "MongoDB", "API", "SQL"]
    }
  }*/

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
        <ProjectCard name={card.name} field={card.field} tags={card.tags} url={card.url} projectsAnim={setExitAnim}/>
      )}
    </>
  }

  const [exitAnim, setExitAnim] = useState("");

  const variants = {
    above: { translateY: '-100%' },
    below: { translateY: '100%' },
    left: { translateX: '-100%' }
  }

  return (
    <motion.div 
      className="ProjectsPage"
      initial={ props.varient }
      animate={{ translateY: '0%', translateX: '0%' }}
      exit={ exitAnim }
      variants={ variants }
      transition={{ duration: 1 }}  
    >
      <PageNavButton link="/" location="Landing" direction="up" hasFunc={true} projectsAnim={setExitAnim} animDir="below"/>
      {!loadingData ?         
        <div className='ProjectPageContent'>
          <div className={filtering ? 'ProjectCardsContainer Filtering ContentBox' : 'ProjectCardsContainer Full ContentBox'}>
            {displayProjectCards()}
          </div>
          <FilterTab active={filtering} toggleActive={toggleActive} filterData={projectPageData.filterData} updateFilterData={updateFilterData}/>
        </div> :
        <div className='ProjectPageContent'>
          <h1>Loading Data</h1>
        </div>
      }
      <PageNavButton link="/contacts" location="Contacts" direction="down" hasFunc={true} projectsAnim={setExitAnim} animDir="above"/>
    </motion.div>
  );
}

export default ProjectsPage;