import { Artist } from "src/artist/artist.entity";

export class ReturnAlbumDto{
    id: string;
    name: string;
    year: number;
    artist: Artist;
}