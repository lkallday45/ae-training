type Song = {
  createdBy: string;
  createAt: string;
  updatedBy: string;
  updatedAt: string;
  artist: string;
  title: string;
  length: string;
};

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
      <h1 className="underline">Songs</h1>
      {songs.map((song) => {
        return (
          <div className="max-w-sm rounded overflow-hidden shadow-lg text-center bg-gray-200 m-3 border-gray-300">
            <div className="font-bold text-xl mb-2">{song.title}</div>
            <p className="text-gray-700 text-base p-2">{song.artist}</p>
            <p className="text-gray-700 text-base p-2">{song.length}</p>
            <p className="text-gray-700 text-base p-2">{song.createdBy}</p>
            <p className="text-gray-700 text-base p-2">{song.createAt}</p>
            <p className="text-gray-700 text-base p-2">{song.updatedBy}</p>
            <p className="text-gray-700 text-base p-2">{song.updatedAt}</p>
          </div>
        );
      })}
    </>
  );
}
