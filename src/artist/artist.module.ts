import { Module } from "@nestjs/common";
import { AlbumModule } from "src/album/album.module";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { forwardRef } from "@nestjs/common";
import { TrackModule } from "src/track/track.module";
import { FavoritesModule } from "src/favorites/favorites.module";

@Module({
    imports: [
        forwardRef(() => AlbumModule),
        forwardRef(() => TrackModule),
        forwardRef(() => FavoritesModule)
    ],
    providers: [ArtistService],
    controllers: [ArtistController],
    exports: [ArtistService]
})
export class ArtistModule {}