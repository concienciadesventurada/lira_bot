import { Queue } from "../structures/queue";
import { Track } from "../interfaces/track";

export const TrackQueue = new Queue<Track>(1024);
