import ky from "ky";
import { Deserializer } from "jsonapi-serializer";
import { Song } from "../types/Song";

export type SongResponse = {
  type: "songs";
  id: string;
  attributes: {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    artist: string;
    title: string;
    length: string;
  };
  relationships?: {
    album: {
      data: {
        type: "album";
        id: string;
      };
    };
    playlists?: {
      data: [
        {
          type: "playlists";
          id: string;
        }
      ];
    };
    likes?: {
      data: [
        {
          type: "likes";
          id: string;
        }
      ];
    };
  };
};

export type GetSongsResponse = {
  data: SongResponse[];
  included?: [
    {
      type: string;
      id: string;
      attributes: {
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
        name: string;
      };
      relationships: {
        songs: {
          data: [
            {
              type: string;
              id: string;
            }
          ];
        };
      };
    }
  ];
  links?: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
};

export async function getSongs(): Promise<Song[]> {
  const resp = (await ky("http://localhost:3000/v1/songs", {
    headers: {
      accept: "application/vnd.api+json",
      prefer: "code=200, dynamic=true",
    },
  }).json()) as GetSongsResponse;

  // const resp = (await ky(
  //   "https://stoplight.io/mocks/advisorsexcel/node-music-api/157460764/v1/songs",
  //   {
  //     headers: {
  //       Accept: "application/vnd.api+json",
  //       Prefer: "code=200, dynamic=true",
  //     },
  //   }
  // ).json()) as GetSongsResponse;

  const deserializer = new Deserializer({
    keyForAttribute: "camelCase",
  });

  return await deserializer.deserialize(resp);
}
