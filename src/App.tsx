import { SongMetaData } from "./SongMetaData";
import { Song } from "./types/Song";

const songs: Song[] = [
  {
    createdBy: "admin@email.com",
    createAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "Pink Floyd",
    title: "Time",
    length: "6:53",
  },
  {
    createdBy: "admin@email.com",
    createAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "The Beatles",
    title: "Here Comes the Sun",
    length: "3:05",
  },
];

export function App() {
  return (
    <>
      <section>
        <h1 className="underline text-4xl">Songs</h1>
        {songs.map((song) => {
          return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-3 bg-white hover:bg-cyan-500 transition-colors border-gray-300 p-5">
              <h2 className="font-bold text-3xl mb-2 p-2">
                {song.title} by: {song.artist}
              </h2>
              <SongMetaData
                email={song.createdBy}
                date={song.createAt}
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
