import { useState, useCallback } from "react";
import { AxiosError } from "axios";

export interface RequestState {
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export default function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      const res = await fn();
      setIsError(false);
      return res;
    } catch (err) {
      setIsError(true);
      if (err instanceof AxiosError) {
        setError(err.response?.data.msg || "Unknown error");
      } else {
        setError(String(err));
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { run, isLoading, isError, error };
}
