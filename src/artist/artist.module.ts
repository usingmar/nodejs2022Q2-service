import { Module } from "@nestjs/common";
import { AlbumModule } from "src/album/album.module";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { forwardRef } from "@nestjs/common";

@Module({
    imports: [forwardRef(() => AlbumModule)],
    providers: [ArtistService],
    controllers: [ArtistController],
    exports: [ArtistService]
})
export class ArtistModule {}