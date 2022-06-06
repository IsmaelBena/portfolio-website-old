import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../projects_page/projectsPage.css';

function ToggleFilterButton(props) {

  const clickHandler = () => {
    props.toggleActive();
  }
  
  return (
    <motion.div className="ToggleFilterButton"
        initial={{opacity: 0}}
        animate={props.active ? {opacity: 1, backgroundColor: 'grey'} : {opacity: 1, backgroundColor: 'rgba(0,0,0,0)'}}
        exit={{opacity: 0, backgroundColor: 'rgba(0,0,0,0)'}}
        whileHover={{ backgroundColor: 'grey' }}
        transition={{duration: 0.5}}
        onClick={clickHandler}
    >
        <h2 className='FilteringHeader'>Filter</h2>
    </motion.div>
  )
}

export default ToggleFilterButton;