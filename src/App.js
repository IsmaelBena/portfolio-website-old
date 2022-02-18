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

  const [projectPageAnimPos, setProjectPageAnimPos] = useState("temp")

  const []

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage test={projectPageAnimPos} projectPageAnim={setProjectPageAnimPos} />} />
          <Route path="/projects" element={<ProjectsPage varient={projectPageAnimPos} projectPageAnim={setProjectPageAnimPos} />} />
          <Route path="/project/:name" element={<ProjectPage projectPageAnim={setProjectPageAnimPos}/>} />
          <Route path="/contacts" element={<ContactsPage projectPageAnim={setProjectPageAnimPos}/>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
