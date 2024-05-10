import axios from "axios";
import "dotenv/config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const { data } = await axios.post(import.meta.BACKEND_URL + route, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const { data } = await axios.post(import.meta.BACKEND_URL + route, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const { data } = await axios.get(import.meta.BACKEND_URL + route, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};
