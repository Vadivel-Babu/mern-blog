import { useMutation, useQueryClient } from "@tanstack/react-query";

import AxiosInstance from "../../utils/AxiosInstance";

const update = async (data) => {
  const response = await AxiosInstance.put(`/posts/${data.id}`, data);

  return response;
};

const updatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
  });
};

export default updatePost;
