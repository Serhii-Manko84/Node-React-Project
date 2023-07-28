import React, { useState } from "react";
import axios from "axios";

import css from "./Customers.module.css";

function Customers({ addNewCustomer }) {
  const [form, setForm] = useState({ customer: "", customerName: "" });

  const handleForm = (event) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:5000/customers", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = response.data;

    addNewCustomer(resData);

    setForm({ customer: "", customerName: "" });
  };
  return (
    <div className={css.wrapper}>
      <form className={css.wrapperForm} onSubmit={handleSubmit}>
        <label className={css.title}> № Клієнта </label>
        <input
          className={css.textInput}
          type="text"
          name="customer"
          value={form.customer}
          onChange={handleForm}
          required
        />
        <label className={css.title}> Найменування Клієнта </label>
        <input
          className={css.textInput}
          type="text"
          name="customerName"
          value={form.customerName}
          onChange={handleForm}
          required
        />

        <button className={css.button} type="submit">
          Створити Клієнта
        </button>
      </form>
    </div>
  );
}

export default Customers;
