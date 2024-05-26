
// import PropType from 'prop-types';


import { useState } from 'react';


const SearchBarForm=()=>{
    const [formData, setFormData]= useState({
    project_title: '',
    project_description: '',
    project_url: '',
    email: '',
    technology: '',
    question_description: '',
    profile_name: '',
    profile_lastname: '',
    profile_username: '',
    profile_role: '',
    company_name: ''})


const handleSubmit=(e)=>{
    const newValue = e.target.value;
    setFormData({
        project_title: newValue,
        project_description: newValue,
        project_url: newValue,
        email: newValue,
        technology: newValue,
        question_description: newValue,
        profile_name: newValue,
        profile_lastname: newValue,
        profile_username: newValue,
        profile_role: newValue,
        company_name: newValue
    })

  console.log(setFormData);
    
}

return (    
    <form >
        <div>
            <label htmlFor="searchParams"></label>
            <input type="text"
             name="searchParams"
             id="searchParams"
             value={formData.email} 
             onChange={handleSubmit}
                />
        </div>
        <button>Buscar</button>
    </form>
)

}



export default SearchBarForm;