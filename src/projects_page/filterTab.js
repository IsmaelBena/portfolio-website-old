import React, { useEffect, useState } from 'react';
import './projectsPage.css';

function FilterTab(props) {

  // make API request to generate all the project entries

  const clickHandler = () => {
    console.log("b4 click: " + props.active);
    props.toggleActive();
    console.log("after click: " + props.active);
  }

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
      <p>{fieldsSelected}</p>
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
    <p>{tagsSelected}</p>
  </div>
  }

  useEffect(() => {
    props.updateFilterData(methodOfFilter, fieldsSelected, tagsSelected);
  }, [methodOfFilter, fieldsSelected, tagsSelected]);


  if (props.active)
  {
    return (
        <div className="FilterTab Active">
          <h2 className='FilteringHeader' onClick={clickHandler}>Hide Filter {methodOfFilter}</h2>
          <div className='methodOfFilterRadioBtns'>
            <div>
              <input type="radio" name="methodOfFilterRadio" value="and" checked={isSelected("and")} onClick={(e) => {setMethodOfFilter(e.target.value)}}/> And
            </div>
            <div>
              <input type="radio" name="methodOfFilterRadio" value="or" checked={isSelected("or")} onClick={(e) => {setMethodOfFilter(e.target.value)}}/> Or
            </div>        
          </div>
          {generateFieldSelection()}
          {generateTagSelection()
         // add a reset filters button
         } 
        </div>
      );
  }
  else
  {
    return (
        <div className="FilterTab Hidden">
          <h2 className='FilteringHeader' onClick={clickHandler}>Show Filter {methodOfFilter}</h2>
        </div>
      );
  }
}

export default FilterTab;