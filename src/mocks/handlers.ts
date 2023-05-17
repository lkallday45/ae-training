// src/mocks/handlers.js
import { rest } from "msw";
import { songs } from "./songs";
import { CreateSongResponse } from "../services/songService";

export const handlers = [
  rest.get("/v1/songs", (_, res, ctx) => {
    return res(
      // Respond with a 200 status code
      // ctx.status(500),
      ctx.status(200),
      ctx.json(songs)
      // ctx.delay(1000)
    );
  }),
  rest.post("/v1/songs", async (req, res, ctx) => {
    const song = (await req.json()) as CreateSongResponse;
    song.data.id = (songs.data.length + 1).toString();
    song.data.attributes.createdAt = new Date().toISOString();
    song.data.attributes.updatedAt = new Date().toISOString();
    song.data.attributes.createdBy = "admin";
    song.data.attributes.updatedBy = "admin";
    songs.data.push(song.data);

    return res(ctx.status(201), ctx.json(song), ctx.delay(0));
  }),

  rest.get("/user", (_, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
