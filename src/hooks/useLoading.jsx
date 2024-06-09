import { useState, useCallback } from "react";

const useLoading = (asyncFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        setIsLoading(false);
        return result;
      } catch (err) {
        setError(err);
        setIsLoading(false);
        throw err;
      }
    },
    [asyncFunction]
  );

  return { execute, isLoading, error };
};

export default useLoading;