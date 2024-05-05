import { API_KEY } from "@env";
import axios from "axios";

const KEY = API_KEY;

const apiURL = `https://pixabay.com/api/?key=${KEY}`;

const formatURL = (params: any) => {
  let url = apiURL + "&per_page=25&safesearch=false&editors_choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key, index) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  return url;
};

export const fetchImages = async (params: any) => {
  try {
    const response = await axios.get(formatURL(params));
    const { data } = response;
    return { success: true, data };
  } catch (err) {
    console.error(err);
    return { success: false, data: err };
  }
};
