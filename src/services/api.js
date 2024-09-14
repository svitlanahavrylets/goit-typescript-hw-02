import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  params: {
    client_id: "8bDsF5LM2xa7xYi8Rv9qLU5p7d20UwWOEiQJdjHKf9Q",
  },
});

export async function getImages(query, page) {
  const { data } = await articlesApi.get(
    `search/photos/?query=${query}&page=${page}`
  );
  return data;
}
export default getImages;
