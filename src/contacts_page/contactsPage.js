import './contactsPage.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import NavBar from '../global_components/NavBar';
import ContactCard from './contactCard';

import githubIcon from "../images/github-icon.png"
import emailIcon from "../images/email-icon.png"
import linkedinIcon from "../images/linkedin-icon.png"


function ContactsPage(props) {

  useEffect(() => {
    console.log(props.navBarEntryAnim)
    props.setNavBarEntryAnim(true)
  }, []);

  const contactsContainerAnim = {
    hidden: {
      opacity: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.25
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.5,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      translateX: "-100%"
    }
  };

  return (
    <motion.div className="ContactsPage">
      <NavBar navBarEntryAnim={props.navBarEntryAnim} showFilterBar={false} pageHeader="Contacts" redirectLocation="/" exitAnim={true}/>
      <motion.div className='ContactsPageContent'>
        <motion.ul className='ContactCardsUL'
          variants={contactsContainerAnim}
          initial="hidden"
          animate="visible"
        >
          <ContactCard contactURL="https://github.com/IsmaelBena" imgSrc={githubIcon} platform="Github" bannerTxt="github.com/IsmaelBena"/>
          <ContactCard contactURL="mailto:Ismael.Benadjal@gmail.com" imgSrc={emailIcon} platform="Email" bannerTxt="Ismael.Benadjal@gmail.com"/>
          <ContactCard contactURL="https://linkedin.com/in/ismael-benadjal" imgSrc={linkedinIcon} platform="LinkedIn" bannerTxt="linkedin.com/in/ismael-benadjal"/>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

export default ContactsPage;