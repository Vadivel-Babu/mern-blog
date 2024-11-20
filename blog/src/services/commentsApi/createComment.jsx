import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";

const createComment = async (data) => {
  const response = await AxiosInstance.post(
    `posts/comment/${data.postId}`,
    data
  );

  return response;
};

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
  });
};

export default useCreateComment;
