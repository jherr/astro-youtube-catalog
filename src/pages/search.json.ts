import { getCollection } from "astro:content";

const videosPromise = getCollection("videos");

export async function get({ request }) {
  const videos = await videosPromise;

  console.log(request.url);

  return new Response(
    JSON.stringify(
      videos.filter((video) =>
        video.data.title
          .toLowerCase()
          .includes({ query: "react" }.query.toLowerCase())
      )
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
