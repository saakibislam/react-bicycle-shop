import { useEffect, useState } from "react";

export const apiUrl = process.env.REACT_APP_API_URL;

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}${endpoint}`, { signal });
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            setData(result.data);
            setMessage(result.message);
          } else {
            setError(new Error(result.message));
          }
        }
      } catch (error) {
        if (isMounted && error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [endpoint, fetchCount]);

  const refetch = () => setFetchCount((c) => c + 1);

  return { data, message, loading, error, setData, refetch };
};

export const postApi = async (endpoint, body) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to post data");
  }
  return result;
};

export const putApi = async (endpoint, body) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to put data");
  }
  return result;
};

export const deleteApi = async (endpoint) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to delete data");
  }
  return result;
};

export const patchApi = async (endpoint, body) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to patch data");
  }
  return result;
};
