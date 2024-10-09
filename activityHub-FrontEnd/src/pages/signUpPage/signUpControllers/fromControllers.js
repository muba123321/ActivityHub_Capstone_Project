import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// This function is to handle and set changes to the input fields and stored in formData
export const handleChange = (e, formData, setFormData, setErrors) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
  // this is to clear  errors for the specific field when valid input is provided
  if (value) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  }
};

// email validation using regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (formData) => {
  const errors = {};

  //Password requirement
  if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Password must contain at least one number";
  }

  // Checking if password match
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const validateForm = (formData) => {
  const validationErrors = validatePassword(formData);
  if (!formData.email) {
    validationErrors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    validationErrors.email = "Please enter a valid email address";
  }

  return validationErrors;
};

// This function is to submit the formData when all validations are complete
export const handleSubmit = async (
  e,
  formData,
  setErrors,
  setLoading,
  navigate
) => {
  e.preventDefault();

  const validationErrors = validateForm(formData);
  setErrors(validationErrors);
  // Here will implement logic to submit the form data to your backend AP

  if (Object.keys(validationErrors).length === 0) {
    const { confirmPassword, ...dataToSubmit } = formData;
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        dataToSubmit.email,
        dataToSubmit.password
      );
      const firebaseUser = userCredential.user;

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: dataToSubmit.name,
          email: firebaseUser.email,

          uid: firebaseUser.uid,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        setErrors({ api: data.message });
        setLoading(false);
        return;
      }
      setLoading(false);
      setErrors({});
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
      setErrors({ api: err.message });
      setLoading(false);
    }
  }
};
