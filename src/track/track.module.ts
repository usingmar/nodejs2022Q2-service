import { Module } from "@nestjs/common";
import { forwardRef } from "@nestjs/common";
import { AlbumModule } from "src/album/album.module";
import { ArtistModule } from "src/artist/artist.module";
import { FavoritesModule } from "src/favorites/favorites.module";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
    imports: [
        forwardRef(() => ArtistModule),
        forwardRef(() => AlbumModule),
        forwardRef(() => FavoritesModule)
    ],
    providers: [TrackService],
    controllers: [TrackController],
    exports: [TrackService]
})
export class TrackModule{}