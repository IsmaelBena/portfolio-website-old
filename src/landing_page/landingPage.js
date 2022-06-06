import './landingPage.css';
import { motion } from "framer-motion";
import { useMediaPredicate } from "react-media-hook";
import PageNavButton from '../global_components/pageNavButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LandingPage(props) {

  const desktop = useMediaPredicate("(min-width: 820px)");
  const navigate = useNavigate();

  useEffect(() => {
    props.setNavBarEntryAnim(true)
  }, [])

  return (
    <motion.div className="LandingPage">
      {desktop ?
        <>
          <motion.div className='LandingToProjects'
            initial={{ translateX: '-50%', opacity: 0 }}
            animate={{ translateX: '0%', opacity: 1 }}
            exit={{ translateX: '-50%', opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px 5px #000000",
              transition: { duration: 0.35 },
            }}
            onClick={e => navigate('/projects')}
          >
            <h1 className='LandingProjectsText'>Projects</h1>
          </motion.div>
          <motion.div className='LandingPageText'
            initial={{ translateY: '-50%', opacity: 0 }}
            animate={{ translateY: '0%', opacity: 1 }}
            exit={{  translateY: '-50%', opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='Welcome'>Hi, Welcome to my portfolio. {props.test}</h1>
            <h2 className='About'>Anim velit sunt sint do est tempor irure eu cillum et. Mollit excepteur adipisicing anim excepteur ad nostrud ea aliqua adipisicing aliqua laborum aliqua ad est. Aliqua aute nostrud veniam irure incididunt elit tempor deserunt. Excepteur esse dolore aliquip quis nostrud occaecat. Sit exercitation nisi exercitation consequat aute minim ipsum amet Lorem sint dolore exercitation. Irure anim exercitation irure aliquip cillum sit culpa culpa anim cillum. Nulla nisi ipsum officia proident sunt.</h2>
          </motion.div>
          <motion.div className='LandingToContacts'
              initial={{ translateX: '50%', opacity: 0 }}
              animate={{ translateX: '0%', opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px 5px #000000",
              transition: { duration: 0.35 },
            }}
            onClick={e => navigate('/contacts')}
          >
            <h1 className='LandingContactsText'>Contacts</h1>
          </motion.div>
        </> : 
        <>
          <div className='LandingPageText'>
            <h1 className='Welcome'>Hi, Welcome to my portfolio. {props.test}</h1>
            <h2 className='About'>Anim velit sunt sint do est tempor irure eu cillum et. Mollit excepteur adipisicing anim excepteur ad nostrud ea aliqua adipisicing aliqua laborum aliqua ad est. Aliqua aute nostrud veniam irure incididunt elit tempor deserunt. Excepteur esse dolore aliquip quis nostrud occaecat. Sit exercitation nisi exercitation consequat aute minim ipsum amet Lorem sint dolore exercitation. Irure anim exercitation irure aliquip cillum sit culpa culpa anim cillum. Nulla nisi ipsum officia proident sunt.</h2>
          </div>
          <div className='MobileNav'>
            <div className='LandingToProjects'
              onClick={e => navigate('/projects')}
            >
              <h1 className='LandingProjectsText'>Projects</h1>
            </div>
            <div className='LandingToContacts'
              onClick={e => navigate('/contacts')}
            >
              <h1 className='LandingContactsText'>Contacts</h1>
            </div>
          </div>
        </>
      }
    </motion.div>
  );
}

export default LandingPage;