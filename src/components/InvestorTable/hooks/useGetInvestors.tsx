import {useQuery} from "@tanstack/react-query";
import {REACT_APP_API_URL} from "../../../App.tsx";

export const useGetInvestors = () => {
  return useQuery({
    queryKey: ["investors"],
    queryFn: async () => {
      const fetchedData = await fetch(`${REACT_APP_API_URL}/investors`)

      return await fetchedData.json()
    }
  })
}