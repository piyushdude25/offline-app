// src/components/PersonalInfo.js
import React, { useState } from "react";

const PersonalInfo = ({ onSave }) => {
  const [personalArea, setPersonalArea] = useState("");
  const [subArea, setSubArea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { personalArea, subArea };
    // Save data to local storage
    localStorage.setItem("personalInfo", JSON.stringify(data));
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <label>
        Personal Area:
        <select
          value={personalArea}
          onChange={(e) => setPersonalArea(e.target.value)}
          required
        >
          <option value="">Select Area</option>
          <option value="Area1">Area1</option>
          <option value="Area2">Area2</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <label>
        Sub Area:
        <input
          type="text"
          value={subArea}
          onChange={(e) => setSubArea(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default PersonalInfo;
