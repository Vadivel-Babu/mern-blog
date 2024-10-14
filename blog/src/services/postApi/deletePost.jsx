import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";

const remove = async (id) => {
  console.log(id);

  const response = await AxiosInstance.delete(`posts/${id}`);
  return response;
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.warning("Post deleted");
    },
  });
};

export default useDeletePost;
