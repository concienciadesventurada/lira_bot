import { AudioResource } from "@discordjs/voice";
import { Queue } from "../structures/queue";

export const MusicQueue = new Queue<AudioResource>(1024);
