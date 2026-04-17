import { Hono } from "hono";
import { serve } from "@hono/node-server";

import { db } from "./dbClient";
import ksuid from "ksuid";
const app = new Hono();

app.post("/posts", async (c) => {
  const { title, content, status } = await c.req.json();
  const id = ksuid.randomSync().string;
  console.log({ id, title, content });
  await db.insertInto("posts").values({ id, title, content, status }).execute();
  return c.json({ id, title, content, status });
});

app.get("/posts", async (c) => {
  const posts = await db.selectFrom("posts").selectAll().execute();
  return c.json(posts);
});

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.ZIPUP_PORT!) 
  },
  (info) => {
    console.log(`Server is running on port ${info.port}`);
  }
);
