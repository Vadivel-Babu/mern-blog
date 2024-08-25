import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const getPosts = async () => {
  const response = await AxiosInstance.get("posts");
  // const response = await axios.get("https://dummyjson.com/posts");
  console.log(response);

  return response;
};

const useFetchAllPosts = () => {
  return useQuery({ queryKey: ["posts"], queryFn: getPosts });
};

export default useFetchAllPosts;
