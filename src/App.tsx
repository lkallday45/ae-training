import { Button, CircularProgress } from "@mui/material";
import { SongMetaData } from "./SongMetaData";
import { Song } from "./types/Song";
import { useState } from "react";
import FormField from "./components/FormField";
import { useCreateSong, useGetSongs } from "./hooks/useSongs";

export type NewSong = Omit<
  Song,
  "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy"
>;

const newSong: NewSong = {
  artist: "",
  title: "",
  length: "",
};

export type Errors = {
  artist?: string;
  title?: string;
  length?: string;
};

export type Touched = {
  artist?: boolean;
  title?: boolean;
  length?: boolean;
};

export type Status = "idle" | "submitted";

export function App() {
  const [song, setSong] = useState(newSong);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Touched>({});
  const [formKey, setFormKey] = useState(1);

  // Derived state
  const errors = validate();

  const { data: songs = [], isLoading, isRefetching } = useGetSongs();

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSong({ ...song, [e.target.id]: e.target.value });
  }

  function validate(): Errors {
    const errors: Errors = {};

    if (!song.title) {
      errors.title = "Title is required";
    }
    if (!song.artist) {
      errors.artist = "Artist is required";
    }
    if (!song.length) {
      errors.length = "Length is required";
    }

    return errors;
  }

  const songMutation = useCreateSong(() => {
    setFormKey(formKey + 1);
    setSong(newSong);
    setStatus("idle");
  });

  // const songMutation = useMutation({
  //   mutationFn: (song: NewSong) => createSong(song),
  //   onSuccess: () => {
  //     setFormKey(formKey + 1);
  //     setSong(newSong);
  //     setStatus("idle");
  //     queryClient.invalidateQueries({ queryKey: ["songs"] });
  //   },
  // });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitted");

    if (Object.keys(errors).length > 0) return;
    // Notification
    // "Disable" submit button
    // Save it somewhere
    // Validate

    // setSong(newSong);

    // setStatus("idle");
    // setTouched({});
    // setFormKey(formKey + 1);

    songMutation.mutate(song);
  }

  return (
    <>
      <section className="m-3">
        <h1 className="underline text-4xl my-5">Songs</h1>
        {isRefetching && <p>Refetching</p>}

        <h2 className="text-xl">Add Song</h2>

        <form className="my-4" onSubmit={onSubmit} key={formKey}>
          <FormField
            onChange={onChange}
            setTouched={setTouched}
            touched={touched}
            error={errors.title}
            status={status}
            label={"Title"}
            value={song.title}
            id={"title"}
          />
          <FormField
            onChange={onChange}
            setTouched={setTouched}
            touched={touched}
            error={errors.artist}
            status={status}
            label={"Artist"}
            value={song.artist}
            id={"artist"}
          />
          <FormField
            onChange={onChange}
            setTouched={setTouched}
            touched={touched}
            error={errors.length}
            status={status}
            label={"Length"}
            value={song.length}
            id={"length"}
          />

          <Button variant="contained" type="submit">
            Add Song
          </Button>
        </form>

        {isLoading ? (
          <CircularProgress />
        ) : (
          songs.map((song) => {
            return (
              <section
                key={song.id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-cyan-200 hover:bg-cyan-500 transition-colors border-gray-300 p-5 mt-3"
              >
                <h2 className="font-bold text-3xl mb-2 p-2">
                  {song.title} by: {song.artist}
                </h2>
                <SongMetaData
                  email={song.createdBy}
                  date={song.createdAt}
                  action="Created"
                />

                <SongMetaData
                  email={song.updatedBy}
                  date={song.updatedAt}
                  action="Updated"
                />
              </section>
            );
          })
        )}
      </section>
    </>
  );
}
