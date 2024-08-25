import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";

const getSinglePost = async (id) => {
  const response = await AxiosInstance.get(`posts/${id}`);
  return response;
};

const getPost = (id) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getSinglePost(id),
  });
};

export default getPost;
