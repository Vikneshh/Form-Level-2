import { useState } from "react";

const useFormValidate = (initial) => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setValues({
        ...values,
        [name]: {
          ...values[name],
          [value]: checked,
        },
      });
    } else {
      setValues({
        ...values,
        [name]: type === "number" ? parseInt(value) : value,
      });
    }
  };

  const validating = (fields) => {
    const newErrors = {};

    if (fields.name.trim() === "") newErrors.name = " Name is required.";
    if (fields.name.trim().length < 3)
      newErrors.name = "Name must be atleast 3 characters";

    if (!fields.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Email is invalid.";

    if (!fields.phoneNumber || fields.phoneNumber.length < 10)
      newErrors.phoneNumber =
        "Phone Number is required and must be at least 10 characters long.";

    if (!fields.position)
      newErrors.position = "Applying for Position is required.";

    if (
      (fields.position === "developer" || fields.position === "designer") &&
      (fields.experience <= 0 || isNaN(fields.experience))
    )
      newErrors.experience =
        "Experience is required and must be a number greater than 0.";

    if (fields.position === "designer" && fields.portfolioURL.trim() === "")
      newErrors.portfolioURL = "Portfolio URL is required.";

    if (
      fields.position === "designer" &&
      !fields.portfolioURL.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)
    )
      newErrors.portfolioURL = "Portfolio URL must be a valid URL.";

    if (fields.position === "manager" && fields.managementExperience === "")
      newErrors.managementExperience = "Management Experience is required.";

    if (!Object.values(fields.skills).some((skill) => skill))
      newErrors.skills = "At least one skill must be selected.";

    if (!fields.preferredInterviewTime)
      newErrors.preferredInterviewTime =
        "Preferred Interview Time is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initial);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validating,
    resetForm,
  };
};

export default useFormValidate;
