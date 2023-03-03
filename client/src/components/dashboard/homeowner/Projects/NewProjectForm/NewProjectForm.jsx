import React, { useState } from "react";
import ServicesButtonGroup from "../../../../ServicesButtonGroup/ServicesButtonGroup";
import { useCreateProject } from "../../../../../hooks/useCreateProject";

const NewProjectForm = (props) => {
    const { showForm } = props;
    const [state, setState] = useState({
        title: "",
        description: "",
        city: "",
        state: "",
        zip_code: "",
        services: []
    });
    const { createProject, isLoading, error } = useCreateProject();

    const storeListing = async (e) => {
        e.preventDefault();
        await createProject(state);
    }

    const setFieldInState = (field, value) => {
        setState({
            ...state,
            [field]: value
        });
    }

    console.log("Form state: ", state);
    return (
        <div>
            {error && <div>{error}</div>}
            <form onSubmit={storeListing}>
                <div className="simpleInputSet"> 
                    <label>Project Name</label>
                    <input 
                        onChange={(e) => {setFieldInState("title", e.target.value)}}
                        value={state.title}
                    />
                </div>
                
                {/* <div className="simpleInputSet">
                    <label>Phone</label>
                    <input 
                        onChange={(e) => {setFieldInState("phone", e.target.value)}}
                        value={state.phone}
                    />
                </div> */}
                
                <div className="addressInput">
                    <label>Project Address</label>
                    <input placeholder="City" 
                        onChange={(e) => {setFieldInState("city", e.target.value)}}
                        value={state.city}
                    />
                    <input placeholder="State" 
                        onChange={(e) => {setFieldInState("state", e.target.value)}}
                        value={state.state}
                    />
                    <input placeholder="Zip code" 
                        onChange={(e) => {setFieldInState("zip_code", e.target.value)}}
                        value={state.zip_code}
                    />
                </div>

                <div className="simpleInputGroup">
                    <label>Service Type</label>
                    <ServicesButtonGroup 
                        setServices={setFieldInState}
                        selectedServices={state.services}
                    />
                </div>
                
                <div className="simpleInputSet">
                    <label>Project Description</label>
                    <input 
                        onChange={(e) => {setFieldInState("description", e.target.value)}}
                        value={state.description}
                    />
                </div>

                <div className="buttonGroup">
                    <button onClick={() => showForm(false)}>Cancel</button>
                    <button 
                        disabled={isLoading}
                        type="submit"
                    > Save </button>
                </div>
            </form>
        </div>
    )
}

export default NewProjectForm;