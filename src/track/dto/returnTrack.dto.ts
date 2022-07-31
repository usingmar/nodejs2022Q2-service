import { ReturnAlbumDto } from "src/album/dto/returnAlbum.dto";
import { Artist } from "src/artist/artist.entity";

export class ReturnTrackDto {
    id: string;
    name: string;
    artist: Artist | null;
    album: ReturnAlbumDto | null;
    duration: number;
  }