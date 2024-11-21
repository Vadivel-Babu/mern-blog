import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const update = async (data) => {
  const response = await AxiosInstance.put(`/user/profile`, data);
  return response;
};

const useUpdateProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["profile"] }),
        queryClient.invalidateQueries({ queryKey: ["user"] }),
      ]);

      toast.success("Profile Updated");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
  });
};

export default useUpdateProfile;
