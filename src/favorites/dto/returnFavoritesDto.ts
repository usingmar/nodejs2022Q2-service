import { ReturnAlbumDto } from "src/album/dto/returnAlbum.dto";
import { Artist } from "src/artist/artist.entity";
import { ReturnTrackDto } from "src/track/dto/returnTrack.dto";

export class ReturnFavoritesDto{
    artists: Artist[];
    albums: ReturnAlbumDto[];
    tracks: ReturnTrackDto[];
  }