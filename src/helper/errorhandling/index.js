import { snackbar } from "../snacbar";

function handleTokenErrors(error) {
  if (!error) {
    snackbar("errors", "bad connection, content cannot update");
  } else {
    snackbar(
      error?.response?.data
        ? error.response.data.message
        : `Request failed with status code ${502}`
    );
  }
  if (error.response.status === 500) {
    if (
      error.response.data.error === "Token is expired" ||
      error.response.data.message === "Token is expired"
    ) {
      logout();
    }
  }
  Promise.reject(error);
  throw error;
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = window.location.origin;
}

export { logout, handleTokenErrors };
