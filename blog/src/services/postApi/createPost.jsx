import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const createPost = async (data) => {
  console.log(data);

  const response = await AxiosInstance.post("posts", data);
  console.log(response);

  return response;
};

const useCreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
  });
};

export default useCreatePost;
