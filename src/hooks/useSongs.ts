import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSong, getSongs } from "../services/songService";
import { NewSong } from "../App";

const keys = {
  songs: ["songs"],
};

export function useGetSongs() {
  return useQuery({
    queryKey: keys.songs,
    queryFn: getSongs,
  });
}

export function useCreateSong(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (song: NewSong) => createSong(song),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.songs });
      onSuccess();
    },
  });
}
