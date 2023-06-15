import { NoSubscriberBehavior, createAudioPlayer } from "@discordjs/voice";

const maxTransmissionGap = 5000;

export const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Play,
    maxMissedFrames: Math.round(maxTransmissionGap / 20),
  },
});
