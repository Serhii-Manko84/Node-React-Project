import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

import Customers from "../Customers/Customers";
import css from "./Projects.module.css";
import { fetchCustomerData, fetchProjectData } from "../services/API";

function Projects() {
  const [customerData, setCustomerData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [projectNumber, setProjectNumber] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const projectsData = async () => {
      const projectData = await fetchProjectData();
      setProjectData(projectData);
    };

    const customersData = async () => {
      const customerData = await fetchCustomerData();
      setCustomerData(customerData);
    };

    customersData();
    projectsData();
  }, []);

  const addNewCustomer = (newCustomer) => {
    setCustomerData((prevCustomerData) => [
      ...prevCustomerData,
      {
        value: newCustomer.customer,
        label: newCustomer.customer,
      },
    ]);
  };

  const handleCustomersChange = (selectedCustomer) => {
    setSelectedCustomer(selectedCustomer);

    const projectCustomer = projectData.find(
      (project) => project.customer === selectedCustomer.label
    );

    if (projectCustomer) {
      setProjectNumber(projectCustomer.projectNumber);
      setSelectedProject(projectCustomer.projectNumber);
    } else {
      setProjectNumber(null);
      setSelectedProject("");
    }
  };

  const generateProjectNumber = () => {
    const selectedCustomerLabel = selectedCustomer.label;
    const currentData = new Date().toLocaleDateString();
    return `${selectedCustomerLabel}-${currentData}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedCustomer) {
      const newProjectNumber = generateProjectNumber();
      setProjectNumber(newProjectNumber);

      const data = {
        customer: selectedCustomer.label,
        projectNumber: newProjectNumber,
      };

      try {
        const response = await axios.post("http://localhost:5000/demo", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const newProject = {
          value: response.data.projectNumber,
          label: response.data.projectNumber,
          customer: selectedCustomer.label,
        };

        setProjectData((prevProjectData) => [...prevProjectData, newProject]);
        setSelectedProject(newProject.value);
      } catch (error) {
        console.error("Error create new project", error);
      }
    } else {
      console.log("Please select Customer");
    }
  };

  const findCustomerProjectNumber = (projectNumber) => {
    const project = projectData.find(
      (project) => project.value === projectNumber
    );
    if (project) {
      return { value: project.customer, label: project.customer };
    }
    return null;
  };

  const handleProjectChange = (selectedProject) => {
    setSelectedProject(selectedProject.value);

    const correspondingCustomer = findCustomerProjectNumber(
      selectedProject.value
    );

    if (correspondingCustomer) {
      setSelectedCustomer(correspondingCustomer);
    } else {
      setSelectedCustomer(null);
    }
  };

  return (
    <>
      {/* <div className={css.wrapper}> */}
      <Customers addNewCustomer={addNewCustomer} />
      {/* </div> */}

      <div className={css.wrapper}>
        <form className={css.wrapperForm} onSubmit={handleSubmit}>
          <label className={css.title}> Клієнт №</label>

          <Select
            options={customerData}
            value={selectedCustomer}
            onChange={handleCustomersChange}
            placeholder="Виберіть клієнта..."
          />

          <button
            className={css.button}
            type="submit"
            disabled={!selectedCustomer}
          >
            Створити Проект
          </button>

          <label className={css.title}> Проект № </label>
          <Select
            options={projectData}
            value={
              selectedProject
                ? { value: selectedProject, label: selectedProject }
                : null
            }
            onChange={handleProjectChange}
            placeholder="Виберіть проект..."
          />
        </form>
      </div>
    </>
  );
}

export default Projects;
