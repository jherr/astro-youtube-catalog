import { ComponentChildren, JSX } from "preact";

export default function ({
  thumbnails,
  title,
}: {
  thumbnails: {
    medium: {
      url: string;
    };
  };
  title: string;
}) {
  return (
    <div class="space-y-4">
      <img
        class="mx-auto h-20 rounded-xl lg:h-24"
        src={thumbnails.medium.url}
        alt=""
      />
      <div class="space-y-2">
        <div class="text-xs font-medium lg:text-sm">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
}
