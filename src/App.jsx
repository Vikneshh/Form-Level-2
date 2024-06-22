import React, { useState } from "react";
import useFormValidate from "./hooks/useFormValidate";

const App = () => {
  const [isEditing, setIsEditing] = useState(true);
  const { values, errors, handleChange, validating, resetForm } =
    useFormValidate({
      name: "",
      email: "",
      phoneNumber: "",
      position: "",
      experience: "",
      portfolioURL: "",
      managementExperience: "",
      skills: {
        JavaScript: false,
        CSS: false,
        Python: false,
      },
      preferredInterviewTime: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validating(values);
    if (isValid) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <div className="w-50 mx-auto">
      <h1 className="text-center">Job Application Form</h1>
      {isEditing ? (
        <form
          className="bg-body-secondary p-4 rounded-4"
          onSubmit={handleSubmit}
          id="myForm"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <small className="text-danger">{errors.phoneNumber}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Applying for Position:
            </label>
            <select
              className="form-control"
              id="position"
              name="position"
              value={values.position}
              onChange={handleChange}
            >
              <option value="">Select Position</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
            {errors.position && (
              <small className="text-danger">{errors.position}</small>
            )}
          </div>

          {(values.position === "developer" ||
            values.position === "designer") && (
            <div className="mb-3">
              <label htmlFor="experience" className="form-label">
                Relevant Experience (in years):
              </label>
              <input
                type="number"
                className="form-control"
                id="experience"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                min="1"
              />
              {errors.experience && (
                <small className="text-danger">{errors.experience}</small>
              )}
            </div>
          )}

          {values.position === "designer" && (
            <div className="mb-3">
              <label htmlFor="portfolioURL" className="form-label">
                Portfolio URL:
              </label>
              <input
                type="text"
                className="form-control"
                id="portfolioURL"
                name="portfolioURL"
                value={values.portfolioURL}
                onChange={handleChange}
              />
              {errors.portfolioURL && (
                <small className="text-danger">{errors.portfolioURL}</small>
              )}
            </div>
          )}

          {values.position === "manager" && (
            <div className="mb-3">
              <label htmlFor="managementExperience" className="form-label">
                Management Experience:
              </label>
              <input
                type="text"
                className="form-control"
                id="managementExperience"
                name="managementExperience"
                value={values.managementExperience}
                onChange={handleChange}
              />
              {errors.managementExperience && (
                <small className="text-danger">
                  {errors.managementExperience}
                </small>
              )}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Additional Skills:</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="JavaScript"
                name="skills"
                value="JavaScript"
                checked={values.skills.JavaScript}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="JavaScript">
                JavaScript
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="CSS"
                name="skills"
                value="CSS"
                checked={values.skills.CSS}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="CSS">
                CSS
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="Python"
                name="skills"
                value="Python"
                checked={values.skills.Python}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="Python">
                Python
              </label>
            </div>
            {errors.skills && (
              <small className="text-danger">{errors.skills}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="preferredInterviewTime" className="form-label">
              Preferred Interview Time:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="preferredInterviewTime"
              name="preferredInterviewTime"
              value={values.preferredInterviewTime}
              onChange={handleChange}
            />
            {errors.preferredInterviewTime && (
              <small className="text-danger">
                {errors.preferredInterviewTime}
              </small>
            )}
          </div>
          <div className="text-center">
            <button type="submit" className="mt-3 btn btn-primary custom-btn">
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 btn btn-secondary float-end"
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-body-secondary p-4 rounded-4">
          <h3>Summary</h3>
          <p>
            <strong>Name:</strong> {values.name}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {values.phoneNumber}
          </p>
          <p>
            <strong>Applying for Position:</strong> {values.position}
          </p>
          {(values.position === "developer" ||
            values.position === "designer") && (
            <p>
              <strong>Relevant Experience:</strong> {values.experience} years
            </p>
          )}
          {values.position === "designer" && (
            <p>
              <strong>Portfolio URL:</strong> {values.portfolioURL}
            </p>
          )}
          {values.position === "manager" && (
            <p>
              <strong>Management Experience:</strong>{" "}
              {values.managementExperience}
            </p>
          )}
          <p>
            <strong>Additional Skills:</strong>{" "}
            {Object.keys(values.skills)
              .filter((skill) => values.skills[skill])
              .join(", ")}
          </p>
          <p>
            <strong>Preferred Interview Time:</strong>{" "}
            {values.preferredInterviewTime}
          </p>
          <button
            onClick={handleEdit}
            className="mt-3 btn btn-secondary d-block"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
