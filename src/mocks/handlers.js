// src/mocks/handlers.js
import { rest } from "msw";
import { songs } from "./songs";

export const handlers = [
  rest.get("/v1/songs", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(songs)
    );
  }),

  rest.get("/user", (req, res, ctx) => {
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
