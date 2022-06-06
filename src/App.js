// package imports
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
// File imports
import './App.css';
import ProjectPage from './project_page/projectPage';
import ProjectsPage from './projects_page/projectsPage';
import LandingPage from './landing_page/landingPage';
import ContactsPage from './contacts_page/contactsPage';


function App() {
  const location = useLocation();

  const [navBarEntryAnim, setNavBarEntryAnim] = useState(false)

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={true}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage setNavBarEntryAnim={setNavBarEntryAnim}/>} />
          <Route path="/projects" element={<ProjectsPage navBarEntryAnim={navBarEntryAnim} setNavBarEntryAnim={setNavBarEntryAnim} />} />
          <Route path="/project/:name" element={<ProjectPage navBarEntryAnim={navBarEntryAnim} setNavBarEntryAnim={setNavBarEntryAnim}/>} />
          <Route path="/contacts" element={<ContactsPage navBarEntryAnim={navBarEntryAnim} setNavBarEntryAnim={setNavBarEntryAnim}/>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
