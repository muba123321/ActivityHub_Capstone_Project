import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../redux/user/userSlice";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// This function is to handle and set changes to the input fields and stored in formData
export const handleChange = (e, formData, setFormData, dispatch) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });

  // Clear errors when the user modifies the input
  dispatch(signInFailure(null));
};

const validateInput = (formData, dispatch) => {
  if (!formData.email || !formData.password) {
    dispatch(signInFailure("Email and Password are required"));
    return false;
  }
  return true;
};

export const handleSubmit = async (e, formData, dispatch, navigate) => {
  e.preventDefault();

  // Client-side input validation
  if (!validateInput(formData, dispatch)) {
    return;
  }

  try {
    // This signs in the user with firebase
    dispatch(signInStart());
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    // lets get the user token from firebase
    const idToken = await user.getIdToken();

    // We send the idToken to the backend to validate and retrieve User data
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ uid: user.uid }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      // If the backend responds with an error
      dispatch(signInFailure(data.message || "Authentication Failed"));

      return;
    }

    dispatch(signInSuccess({ user: data.user, idToken: idToken }));

    navigate("/");
  } catch (err) {
    console.log(err);

    if (err.code === "auth/invalid-credential") {
      dispatch(signInFailure("Invalid Credentials"));
    } else {
      dispatch(
        signInFailure(err.message || "An error occurred during sign-in")
      );
    }
  }
};
