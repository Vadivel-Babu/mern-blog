import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../../utils/AxiosInstance";

const getProfile = async (id) => {
  const response = await AxiosInstance.get(`/user/profile/${id}`);

  return response;
};

const useFetchProfile = (id) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
  });
};

export default useFetchProfile;
