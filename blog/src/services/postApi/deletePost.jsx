import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const remove = async (id) => {
  console.log(id);

  const response = await AxiosInstance.delete(`posts/${id}`);
  return response;
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: remove,
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.warning("Post deleted");
      navigate("/");
    },
  });
};

export default useDeletePost;
