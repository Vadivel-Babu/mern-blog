import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";

const getNotification = async () => {
  const response = await AxiosInstance.get("notification");

  return response;
};

const useFetchAllNotification = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: getNotification,
    retry: false,
  });
};

export default useFetchAllNotification;
