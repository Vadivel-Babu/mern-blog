import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/axiosInstance";

const remove = async (id) => {
  console.log(id);

  const response = await AxiosInstance.delete(`posts/${id}`);
  return response;
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default useDeletePost;
