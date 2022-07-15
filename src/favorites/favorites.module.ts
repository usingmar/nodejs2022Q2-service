import { forwardRef, Module } from "@nestjs/common";
import { AlbumModule } from "src/album/album.module";
import { ArtistModule } from "src/artist/artist.module";
import { TrackModule } from "src/track/track.module";
import { FavoriteAlbumsController, FavoriteArtistsController, FavoritesController, FavoriteTracksController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";

@Module({
    imports: [
        forwardRef(() => ArtistModule),
        forwardRef(() => AlbumModule),
        forwardRef(() => TrackModule)
    ],
    providers: [FavoritesService],
    controllers: [
        FavoritesController,
        FavoriteAlbumsController,
        FavoriteArtistsController,
        FavoriteTracksController
    ],
    exports: [FavoritesService]
})
export class FavoritesModule{}