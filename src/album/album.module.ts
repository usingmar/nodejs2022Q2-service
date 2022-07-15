import { Module } from "@nestjs/common";
import { ArtistModule } from "src/artist/artist.module";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { forwardRef } from "@nestjs/common";

@Module({
    imports: [forwardRef(() => ArtistModule)],
    providers: [AlbumService],
    controllers: [AlbumController],
    exports: [AlbumService]
})
export class AlbumModule {}