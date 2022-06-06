import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './projectsPage.css';

function FilterTab(props) {

  const [methodOfFilter, setMethodOfFilter] = useState("and");
  const isSelected = (arg) => arg === methodOfFilter;

  const [fieldsSelected, setFieldsSelected] = useState([]);
  const isFieldSelected = (arg) => fieldsSelected.includes(arg);

  const generateFieldSelection = () => {
    return <div className='FieldOptions'>
      {props.filterData.fields.map((field) => 
        <div>
          <input type="checkbox" name="field" checked={isFieldSelected(field)} value={field} onClick={(e) => {fieldsSelected.includes(field) ? setFieldsSelected(fieldsSelected.filter(item => item !== e.target.value)) : setFieldsSelected([...fieldsSelected, e.target.value])}} /> {field}
        </div>
      )}
    </div>
  }

  const [tagsSelected, setTagsSelected] = useState([]);
  const isTagSelected = (arg) => tagsSelected.includes(arg);

  const generateTagSelection = () => {
    return <div className='TagOptions'>
    {props.filterData.tags.map((tag) => 
      <div>
        <input type="checkbox" name="tag" checked={isTagSelected(tag)} value={tag} onClick={(e) => {tagsSelected.includes(tag) ? setTagsSelected(tagsSelected.filter(item => item !== e.target.value)) : setTagsSelected([...tagsSelected, e.target.value])}} /> {tag}
      </div>
    )}
  </div>
  }

  useEffect(() => {
    props.updateFilterData(methodOfFilter, fieldsSelected, tagsSelected);
  }, [methodOfFilter, fieldsSelected, tagsSelected]);

  const variants = {
    hidden: {
      opacity: 0,
      translateX: '-100%',
    },
    active: {
      opacity: 1,
      translateX: '0%',
    }
  }

  return (
      <motion.div className={props.active ? "FilterTab Active" : "FilterTab Hidden"}
        initial="hidden"
        animate={props.active ? 'active' : 'hidden'}
        exit="hidden"
        transition={{duration: 0.5}}
        variants={variants}
      >
        <div className='methodOfFilterRadioBtns'>
          <div>
            <input type="radio" name="methodOfFilterRadio" value="and" checked={isSelected("and")} onClick={(e) => {setMethodOfFilter(e.target.value)}}/> And
          </div>
          <div>
            <input type="radio" name="methodOfFilterRadio" value="or" checked={isSelected("or")} onClick={(e) => {setMethodOfFilter(e.target.value)}}/> Or
          </div>        
        </div>
        {generateFieldSelection()}
        {generateTagSelection()}
      </motion.div>
    );
}

export default FilterTab;