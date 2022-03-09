import './landingPage.css';
import { motion } from "framer-motion";
import PageNavButton from '../global_components/pageNavButton';
import { useEffect } from 'react';


function LandingPage(props) {

  useEffect(() => {
    props.projectPageAnim("below");
  }, []);

  return (
    <motion.div 
      className="LandingPage"
      initial={{ translateY: '-50%', opacity: 0 }}
      animate={{ translateY: '0%', opacity: 1 }}
      exit={{ translateY: '-50%', opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='LandingPageContent'>
        <h1 className='Welcome'>Hi, Welcome to my portfolio. {props.test}</h1>
        {
  /*
      initial={scrollUp ? { translateY: '100%' } : { translateY: '-100%' }}
      animate={{translateY: '0%'}}
      exit={scrollUp ? { translateY: '-100%' } : { translateY: '100%' }}
  */
}
        <h2 className='About'>Anim velit sunt sint do est tempor irure eu cillum et. Mollit excepteur adipisicing anim excepteur ad nostrud ea aliqua adipisicing aliqua laborum aliqua ad est. Aliqua aute nostrud veniam irure incididunt elit tempor deserunt. Excepteur esse dolore aliquip quis nostrud occaecat. Sit exercitation nisi exercitation consequat aute minim ipsum amet Lorem sint dolore exercitation. Irure anim exercitation irure aliquip cillum sit culpa culpa anim cillum. Nulla nisi ipsum officia proident sunt.</h2>
      </div>
      <PageNavButton link="/projects" location="Projects" direction="down"/>
    </motion.div>
  );
}

export default LandingPage;