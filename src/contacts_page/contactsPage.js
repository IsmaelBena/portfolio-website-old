import './contactsPage.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

function ContactsPage(props) {

  useEffect(() => {
    props.projectPageAnim("above")
  }, []);

  return (
    <motion.div 
    className="ContactsPage"
    initial={{ translateY: '100%' }}
    animate={{ translateY: '0%', opacity: 1 }}
    exit={{ translateY: '100%' }}
    transition={{ duration: 0.5 }}  
    >
      <h1>Contacts Page</h1>
    </motion.div>
  );
}

export default ContactsPage;