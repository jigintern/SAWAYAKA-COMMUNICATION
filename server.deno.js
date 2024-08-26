import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";
import { POST_add_DB_SP } from './library/post_add_db_sp.js';
import { POST_delete_DB_SP } from './library/post_delete_db_sp.js';
import { POST_getAll_DB_SP } from './library/post_getall_db_sp.js';



Deno.serve((req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }

  if (req.method === "POST" && pathname === "/add_DB_SP") {
    return POST_add_DB_SP(req);
  }

  if (req.method === "POST" && pathname === "/delete_DB_SP") {
    return POST_delete_DB_SP(req);
  }

  if (req.method === "POST" && pathname === "/getAll_DB_SP") {
    return POST_getAll_DB_SP(req);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
