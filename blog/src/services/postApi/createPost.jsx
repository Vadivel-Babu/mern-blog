import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";

const createPost = async (data) => {
  console.log(data);

  const response = await AxiosInstance.post("posts", data);
  console.log(response);

  return response;
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default useCreatePost;
