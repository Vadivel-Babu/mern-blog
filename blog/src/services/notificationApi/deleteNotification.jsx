import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";

const remove = async () => {
  const response = await AxiosInstance.delete(`notification`);
  return response;
};

const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notification"] });
      toast.warning("Post deleted");
    },
  });
};

export default useDeleteNotification;
