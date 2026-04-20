import { useEffect, useState } from "react";

export const apiUrl = process.env.REACT_APP_API_URL;

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setData(result);
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
  }, [endpoint]);

  return { data, loading, error, setData };
};

export const postApi = async (endpoint, body) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to post data");
  }
  return response.json();
};

export const putApi = async (endpoint, body) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to put data");
  }
  return response.json();
};

export const deleteApi = async (endpoint) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete data");
  }
  return response.json();
};

export const patchApi = async (endpoint, body) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to patch data");
  }
  return response.json();
};
