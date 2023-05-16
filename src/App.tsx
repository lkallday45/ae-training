import { Box, Button, TextField } from "@mui/material";
import { SongMetaData } from "./SongMetaData";
import { Song } from "./types/Song";
import { useState } from "react";

const initialSongs: Song[] = [
  {
    id: "1",
    createdBy: "admin@email.com",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "Pink Floyd",
    title: "Time",
    length: "6:53",
  },
  {
    id: "2",
    createdBy: "admin@email.com",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "The Beatles",
    title: "Here Comes the Sun",
    length: "3:05",
  },
];

type NewSong = Omit<
  Song,
  "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy"
>;

const newSong: NewSong = {
  artist: "",
  title: "",
  length: "",
};

type Errors = {
  artist?: string;
  title?: string;
  length?: string;
};

export function App() {
  const [song, setSong] = useState(newSong);
  const [songs, setSongs] = useState(initialSongs);

  // Derived state
  const errors = validate();

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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Notification
    // "Disable" submit button
    // Save it somewhere
    // Validate
    e.preventDefault();

    setSongs([
      ...songs,
      {
        ...song,
        id: Math.random().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "admin@email.com",
        updatedBy: "admin@email.com",
      },
    ]);

    setSong(newSong);
  }
  return (
    <>
      <section className="m-3">
        <h1 className="underline text-4xl my-5">Songs</h1>

        <h2 className="text-xl">Add Song</h2>

        <form className="my-4" onSubmit={onSubmit}>
          <Box className="my-3">
            <TextField
              label="Title"
              value={song.title}
              id="title"
              onChange={onChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
          </Box>

          <Box className="my-3">
            <TextField
              label="Artist"
              value={song.artist}
              id="artist"
              onChange={onChange}
              error={Boolean(errors.artist)}
              helperText={errors.artist}
            />
          </Box>
          <Box className="my-3">
            <TextField
              label="Length"
              value={song.length}
              id="length"
              onChange={onChange}
              error={Boolean(errors.length)}
              helperText={errors.length}
            />
          </Box>
          <Button variant="contained" type="submit">
            Add Song
          </Button>
        </form>

        {songs.map((song) => {
          return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cyan-200 hover:bg-cyan-500 transition-colors border-gray-300 p-5 mt-3">
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
            </div>
          );
        })}
      </section>
    </>
  );
}
