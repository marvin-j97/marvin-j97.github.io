import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import Vibrant from "node-vibrant";
import toast, { Toaster } from "solid-toast";

import FileInput from "./FileInput";
import type { Palette } from "node-vibrant/lib/color";

export function getImageBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result!.toString());
    });
    reader.addEventListener("error", reject);

    reader.readAsDataURL(file);
  });
}

function copyToClipboard(str: string): Promise<void> {
  return navigator.clipboard.writeText(str);
}

export default function ColorExtractor() {
  const [imageContent, setImageContent] = createSignal<string | null>(null);
  const [palette, setPalette] = createSignal<Palette>({});

  const paletteEntries = createMemo(() =>
    Object.entries(palette()).filter(([_, swatch]) => swatch)
  );

  createEffect(async () => {
    try {
      const img = imageContent();
      if (img) {
        const palette = await Vibrant.from(img).getPalette();
        setPalette(palette);
      }
    } catch (error) {
      console.error(error);
    }
  });

  onMount(() => {
    function dropHandler(event: DragEvent) {
      let file = event.dataTransfer?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            if (reader.result) {
              setImageContent(reader.result.toString());
            }
          },
          false
        );

        reader.readAsDataURL(file);
      }
    }

    function allowDrag(event: DragEvent) {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
    }

    document.addEventListener("dragenter", allowDrag);
    document.addEventListener("dragover", allowDrag);
    document.addEventListener("dragend", allowDrag);

    document.addEventListener("drop", (event) => {
      event.preventDefault();
      dropHandler(event);
    });
  });

  return (
    <>
      <Toaster />
      <FileInput
        onChange={async (file) => {
          const image = await getImageBase64(file);
          setImageContent(image);
        }}
      />
      <div class="text-sm text-gray-500 mt-3 text-center">Or drop a file</div>
      <div class="mt-10">
        <Show when={imageContent()}>
          <div class="flex justify-center">
            <img
              src={imageContent()!}
              alt="Your image"
              class="rounded-lg shadow-lg max-h-[250px]"
            />
          </div>
          <div class="flex justify-center flex-wrap gap-3 mt-10">
            <For each={paletteEntries()}>
              {([_, swatch]) => (
                <div
                  onClick={() => {
                    copyToClipboard(swatch!.hex)
                      .then(() => {
                        toast.success("Copied to clipboard!", {
                          position: "top-center",
                          duration: 1_500,
                        });
                      })
                      .catch(console.error);
                  }}
                  class="flex items-center gap-3 hover:bg-gray-200 px-4 py-2 transition-transform duration-150 hover:translate-y-[-2px] rounded-lg cursor-pointer"
                >
                  <div
                    class="w-[48px] h-[48px] rounded-full cursor-pointer"
                    style={{
                      "background-color": swatch!.hex,
                    }}
                  />
                  <span class="text-lg">{swatch!.hex}</span>
                </div>
              )}
            </For>
          </div>
          <div class="text-center italic mt-10 text-gray-600">
            Click to copy color
          </div>
        </Show>
      </div>
    </>
  );
}
