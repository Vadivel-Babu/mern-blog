import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";

const remove = async (data) => {
  console.log(data);

  const response = await AxiosInstance.delete(
    `posts/comment/${data.postId}/${data._id}`
  );
  return response;
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.warning("Post deleted");
    },
  });
};

export default useDeleteComment;
