import { CollectionEntry } from "astro:content";

import VideoCard from "./VideoCard";

export default function VideoGrid({
  videos,
}: {
  videos: CollectionEntry<"videos">[];
}) {
  return (
    <ul
      role="list"
      class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-3"
    >
      {videos.map(({ data }) => (
        <li>
          <a>
            <VideoCard {...data} />
          </a>
        </li>
      ))}
    </ul>
  );
}
