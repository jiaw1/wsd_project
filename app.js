//deno run --allow-net --watch app.js
//deno run --allow-net --watch app-run.js
//deno run --allow-net --unstable --watch app-run.js
// Remove-item alias:curl
// crtl + p
// Access token: ddp_DSLuqPMbOtNFYr6jAzvUxwFNkIsFfh3rcFVv

import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedbacks from "./feedbacks.js";

const app = new Hono();

app.get("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  const feedbackCount = await feedbacks.getFeedbackCount(id);
  return c.text(`Feedback ${id}: ${feedbackCount}`);
});

app.post("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  await feedbacks.incrementFeedbackCount(id);
  return c.text(`OK`);
});

export default app;
