import { useState, useEffect } from "preact/hooks";

import { CollectionEntry } from "astro:content";
type VideoData = CollectionEntry<"videos">;

import VideoCard from "./VideoCard";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    fetch(`/search.json?q=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, [search]);

  return (
    <div class="flex flex-col items-center justify-center min-h-screen py-2">
      <input
        class="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        placeholder="Search"
        value={search}
        onInput={(e) => setSearch(e.currentTarget.value)}
      />
      <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            thumbnails={video.data.thumbnails}
            title={video.data.title}
          />
        ))}
      </div>
    </div>
  );
}
