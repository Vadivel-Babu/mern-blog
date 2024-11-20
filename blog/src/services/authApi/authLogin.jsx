import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Usercontext } from "../../UserContext";

const login = async (data) => {
  const response = await axios.post(
    "https://mern-blog-9kew.onrender.com/api/auth/login",
    data
  );
  return response;
};

const useLogin = () => {
  const navigate = useNavigate();
  const { handleSetToken } = useContext(Usercontext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Invalidate and refetch
      handleSetToken(data?.data?.token);

      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("LoggedIn");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
  });
};

export default useLogin;
