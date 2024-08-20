import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const login = async (data) => {
  console.log(data);

  const response = await axios.post(
    "https://mern-blog-9kew.onrender.com/api/auth/login",
    data
  );
  console.log(response);
  return response;
};

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      console.log("ji");
    },
  });
};

export default useLogin;
