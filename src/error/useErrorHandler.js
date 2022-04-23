function useErrorHandler() {
  const handleError = (obj) => {
    console.log("error handler : ", obj);
  };
  return { handleError: handleError };
}

export default useErrorHandler;
