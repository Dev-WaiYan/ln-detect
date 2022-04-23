function useErrorHandler() {
  const handleError = (obj) => {
    console.log("error handler : ", obj);
    if (obj.response.status === 403) {
      localStorage.clear();
      window.location.href = "/";
    }
  };
  return { handleError: handleError };
}

export default useErrorHandler;
