import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../../utils/axiosInstance";

const getPosts = async () => {
  const response = await AxiosInstance.get("posts/");
  return response;
};

const useFetchAllPosts = () => {
  return useQuery({ queryKey: ["posts"], queryFn: getPosts });
};

export default useFetchAllPosts;
