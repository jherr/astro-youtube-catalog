import { getCollection } from "astro:content";
import { URL } from "node:url";

const videosPromise = getCollection("videos");

export async function get({ request }) {
  const videos = await videosPromise;

  const q = new URL(request.url).searchParams.get("q")?.toLowerCase();

  return new Response(
    JSON.stringify(
      videos
        .filter((video) => video.data.title.toLowerCase().includes(q ?? ""))
        .slice(0, 10)
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
