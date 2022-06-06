import './contactsPage.css';
import { motion } from 'framer-motion'

function ContactCard(props) {

    
  const contactCardAnim = {
    hidden: {
      opacity: 0,
      translateX: '100%',
      transition: {
        duration: 0.05
      }
    },
    visible: {
      opacity: 1,
      translateX: '0%',
      transition: {
        type: 'spring', 
        stiffness: 25,
        velocity: 5
      }
    },
    exit: {
      opacity: 0,
      translateX: '-100%',
      transition: {
        duration: 0.05
      }
    }
  };

  return (
    <motion.li className='ContactCardLI'
        variants={contactCardAnim}
        whileHover={{
            scale: 1.05,
            boxShadow: '9px 9px 7px 7px #B5B5B5',
            transition: {duration: 0.15}
        }}
    >
        <a className="ContactCard" href={props.contactURL} target="_blank">
            <div className='CardMainConatiner'>
                <img className='ContactLogo' src={props.imgSrc}></img>
                <h1 className='ContactPlatfrom'>
                    {props.platform}
                </h1>
            </div>
            <div className='CardBanner'>
                <p className='ContactURL'>
                    {props.bannerTxt}
                </p>
            </div>
        </a>
    </motion.li>
  );
}

export default ContactCard;