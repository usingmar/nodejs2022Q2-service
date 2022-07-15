import { Module } from "@nestjs/common";
import { ArtistModule } from "src/artist/artist.module";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { forwardRef } from "@nestjs/common";
import { TrackModule } from "src/track/track.module";
import { FavoritesModule } from "src/favorites/favorites.module";

@Module({
    imports: [
        forwardRef(() => TrackModule),
        forwardRef(() => FavoritesModule)
    ],
    providers: [AlbumService],
    controllers: [AlbumController],
    exports: [AlbumService]
})
export class AlbumModule {}