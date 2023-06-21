import { NoSubscriberBehavior, createAudioPlayer } from "@discordjs/voice";

// FIX: Ignores NoSubscriberBehavior
export const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
    maxMissedFrames: 24
  },
});
