import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";

const getMe = async () => {
  const response = await AxiosInstance.get("/auth/me");

  return response;
};

const useFetchMe = () => {
  return useQuery({ queryKey: ["user"], queryFn: getMe, retry: false });
};

export default useFetchMe;
