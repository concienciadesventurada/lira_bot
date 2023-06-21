import { AudioResource, createAudioResource } from "@discordjs/voice";
import ytdl from "ytdl-core";

export class Track {
  public url: string;
  public res: AudioResource;
  public stream: any; // FIX: should be internal.Readable, errors with internal
  public title: string | Promise<string>; // DOUBT: Fetch metadata async?

  constructor(url: string, title: string) {
    this.url = url;
    this.stream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });
    this.res = createAudioResource(this.stream);
    this.title = title;
  }

  static async create(url: string) {
    const { videoDetails: { title } } = await ytdl.getInfo(url);

    return new Track(url, title);
  }
}
