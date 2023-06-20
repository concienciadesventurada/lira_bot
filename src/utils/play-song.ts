import {
  AudioPlayer,
  entersState,
  AudioPlayerStatus,
  AudioResource,
} from "@discordjs/voice";

export const playSong = async (player: AudioPlayer, res: AudioResource) => {
  player.play(res);

  return entersState(player, AudioPlayerStatus.Playing, 5000);
};
