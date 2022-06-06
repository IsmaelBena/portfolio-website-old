import '../projects_page/projectsPage.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ToggleFilterButton from '../projects_page/ToggleFilterButton';
import { useEffect, useState } from 'react/cjs/react.production.min';
import {useLocation} from 'react-router-dom'

function NavBar(props) {

  const location = useLocation();

    const variants = {
        hidden: {
            opacity: 0,
            translateY: '-100%'
        },
        visible: {
            opacity: 1,
            translateY: '0%'
        }
    }

    const textVariants = {
      left: {
        opacity: 0,
        translateX: '-25%'
      },
      right: {
        opacity: 0,
        translateX: '25%'
      },
      middle: {
        opacity: 1,
        translateX: '0%'
      }
    }

  return (
      <motion.div className='NavBar'
        initial={props.navBarEntryAnim ? "hidden" : false}
        animate="visible"
        exit={props.exitAnim ? "hidden" : false}
        transition={{duration: 0.5}}
        variants={variants}
      >
        <Link to={props.redirectLocation} className='NavBarButton'>🠔 Back to landing page</Link>
        <motion.h1 className='ProjectsHeader'
          initial={(location.pathname.length > 9) ? "right" : "left"}
          animate="middle"
          exit={(location.pathname.length > 9) ? "left" : "right"}
          transition={{duration: 0.5}}
          variants={textVariants}
        >{props.pageHeader}</motion.h1>
        <motion.div className='UnderBar'>
          <motion.div className='FilterMenu'>
            {props.showFilterBar ? <>
              {!props.loadingData ?
                <ToggleFilterButton active={props.filtering} toggleActive={props.toggleActive}/>
                : <p1>loading filters</p1>
              }
            </> : <>
              {!props.loadingData ?
                <motion.h2 className='projectProgress'
                  initial={(location.pathname.length > 9) ? "right" : "left"}
                  animate="middle"
                  exit={(location.pathname.length > 9) ? "left" : "right"}
                  transition={{duration: 0.5}}
                  variants={textVariants}
                >{props.projectProgress}</motion.h2>
                : <p>Loading Completion State</p>
              }
            </>}
          </motion.div>
        </motion.div>
      </motion.div>
  );
}

export default NavBar;