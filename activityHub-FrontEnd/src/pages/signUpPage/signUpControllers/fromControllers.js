import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../redux/user/userSlice";

// This function is to handle and set changes to the input fields and stored in formData
export const handleChange = (
  e,
  formData,
  setFormData,
  dispatch
  // setErrors
) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
  // this is to clear  errors for the specific field when valid input is provided

  dispatch(signInFailure(""));
};

// email validation using regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (formData, dispatch) => {
  // Clear previous errors
  dispatch(signInFailure(""));

  //Password requirement
  if (formData.password.length < 8) {
    dispatch(signInFailure("Password must be at least 8 characters long"));
    return false;
  } else if (!/[A-Z]/.test(formData.password)) {
    dispatch(
      signInFailure("Password must contain at least one uppercase letter")
    );
    return false;
  } else if (!/[0-9]/.test(formData.password)) {
    dispatch(signInFailure("Password must contain at least one number"));
    return false;
  }

  // Checking if password match
  if (formData.password !== formData.confirmPassword) {
    dispatch(signInFailure("Passwords do not match"));
    return false;
  }

  return true;
};

const validateForm = (formData, dispatch) => {
  const isPasswordValid = validatePassword(formData, dispatch);
  if (!isPasswordValid) return false;

  if (!formData.email) {
    dispatch(signInFailure("Email is required"));
    return false;
  } else if (!validateEmail(formData.email)) {
    dispatch(signInFailure("Invalid email address"));
    return false;
  }

  return true;
};

// This function is to submit the formData when all validations are complete
export const handleSubmit = async (e, formData, dispatch, navigate) => {
  e.preventDefault();

  if (!validateForm(formData, dispatch)) {
    return;
  }
  const { confirmPassword, ...dataToSubmit } = formData;
  try {
    dispatch(signInStart());
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      dataToSubmit.email,
      dataToSubmit.password
    );
    const firebaseUser = userCredential.user;

    const idToken = await firebaseUser.getIdToken();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        name: dataToSubmit.name,
        email: firebaseUser.email,
      }),
    });
    const data = await res.json();

    if (!data.success) {
      dispatch(signInFailure(data.message || "Failed to create user account"));

      return;
    }
    dispatch(
      signInSuccess({
        user: data.user,
        idToken: idToken,
      })
    );

    navigate("/");
  } catch (err) {
    dispatch(signInFailure(err.message || "Sign-up failed"));
  }
  // }
};
