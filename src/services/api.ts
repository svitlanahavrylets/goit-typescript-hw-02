import axios from "axios";
import { Image } from "../components/App/App.types";

interface ApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

const articlesApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  params: {
    client_id: "8bDsF5LM2xa7xYi8Rv9qLU5p7d20UwWOEiQJdjHKf9Q",
  },
});

export async function getImages(
  query: string,
  page: number
): Promise<ApiResponse> {
  const { data } = await articlesApi.get<ApiResponse>(
    `search/photos/?query=${query}&page=${page}`
  );

  return data;
}
export default getImages;
