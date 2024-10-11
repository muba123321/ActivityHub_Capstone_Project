export const handleLogout = async (
  dispatch,
  signOut,
  auth,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
) => {
  try {
    dispatch(signOutUserStart());
    await signOut(auth);
    const apiRes = await fetch("/api/auth/signOut");
    const resData = await apiRes.json();
    if (!resData.success) {
      dispatch(signOutUserFailure(resData.message));
      return;
    }
    dispatch(signOutUserSuccess(resData));
  } catch (err) {
    dispatch(
      signOutUserFailure(
        `Failed to sign out. Please try again later.  ${err.message}`
      )
    );
  }
};
