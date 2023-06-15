import type { Readable } from "node:stream";
import { createAudioResource, StreamType } from "@discordjs/voice";
import prism from "prism-media";
import { player } from "./player";

const type = "pulse";
const device = "audio_hw_device_id";

// @ts-ignore
export const attachRecorder = (): void => {
  player.play(
    createAudioResource(
      new prism.FFmpeg({
        args: [
          "-analyzeduration",
          "0",
          "-loglevel",
          "0",
          "-f",
          type,
          "-i",
          // @ts-ignore
          type === "dshow" ? `audio=${device}` : device,
          "-acodec",
          "libopus",
          "-f",
          "opus",
          "-ar",
          "48000",
          "-ac",
          "2",
        ],
      }) as Readable,
      {
        inputType: StreamType.OggOpus,
      }
    )
  );
  console.log("Attached recorder - ready to go!");
};
