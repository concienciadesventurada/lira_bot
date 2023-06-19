import {
  AudioPlayer,
  createAudioResource,
  entersState,
  AudioPlayerStatus,
} from "@discordjs/voice";
import ytdl from "ytdl-core";

export const playSong = async (
  player: AudioPlayer,
  url: string = "https://www.youtube.com/watch?v=zPGf4liO-KQ"
) => {
  const stream = ytdl(url, { filter: "audioonly"});

  const res = createAudioResource(stream);

  player.play(res);

  return entersState(player, AudioPlayerStatus.Playing, 5000);
};
