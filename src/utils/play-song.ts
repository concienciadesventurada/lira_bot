import {
  AudioPlayer,
  createAudioResource,
  StreamType,
  entersState,
  AudioPlayerStatus,
} from "@discordjs/voice";

export const playSong = (player: AudioPlayer) => {
  const resource = createAudioResource(
    // PERF: like the wind...
    //"https://www.youtube.com/watch?v=zPGf4liO-KQ",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    { inputType: StreamType.Arbitrary }
  );
  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5000);
};
