import { searchMulti } from "@/services/tmdb.service"
import { useQuery } from "@tanstack/react-query"

export const useSearch = (query: string) => {
    return useQuery({
        queryKey: ["search", query],
        queryFn: () => searchMulti(query),
        enabled: query.length > 0,
        staleTime: 5 * 60 * 1000,
    });
};