import {
  AudioPlayer,
  createAudioResource,
  StreamType,
  entersState,
  AudioPlayerStatus,
} from "@discordjs/voice";

export const playSong = (player: AudioPlayer) => {
  const resource = createAudioResource(
    "https://ia903103.us.archive.org/18/items/likethewindrender1/Like%20The%20Wind%20Render%201.ogg",
    { inputType: StreamType.Arbitrary }
  );
  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5000);
};
