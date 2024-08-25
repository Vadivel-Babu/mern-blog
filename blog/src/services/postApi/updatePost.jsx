import { useMutation, useQueryClient } from "@tanstack/react-query";

import AxiosInstance from "../../utils/axiosInstance";

const update = async (data) => {
  const response = await AxiosInstance.put(`/posts/${data._id}`, data);

  return response;
};

const updatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default updatePost;
