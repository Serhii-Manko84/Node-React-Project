import axios from "axios";

export const fetchProjectData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/");

    const projects = response.data;

    const projectData = projects.map((project) => ({
      value: project.projectNumber,
      label: project.projectNumber,
      customer: project.customer,
    }));
    return projectData;
  } catch (error) {
    console.error("Error ProjectData", error);
  }
};

export const fetchCustomerData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/customers");
    const customers = response.data;
    const customerData = customers.map((customer) => ({
      value: customer.customer,
      label: customer.customer,
    }));
    return customerData;
  } catch (error) {
    console.error("Error customerData", error);
  }
};
