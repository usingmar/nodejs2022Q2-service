import { Controller, Delete, Get, HttpCode, HttpException, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";

@Controller('favs')
export class FavoritesController{

    constructor(private readonly favoritesService: FavoritesService){}

    @Get()
    getFavs(){
        return this.favoritesService.readAll();
    }
}

@Controller('favs/track')
export class FavoriteTracksController{

    constructor(private readonly favoritesService: FavoritesService){}

    @Post(':id')
    addTrackToFavorites(@Param("id", new ParseUUIDPipe({
        exceptionFactory() {
            throw new HttpException({
                statusCode: 400,
                error: "Bad request",
                message: `Track id is invalid (not uuid version 4)`
            }, 400)
        }
        })) id){
        return this.favoritesService.addTrackToFavorites(id);
    }

    @Delete(":id")
    @HttpCode(204)
    deleteTrackFromFavorites(@Param("id", new ParseUUIDPipe({
        exceptionFactory() {
            throw new HttpException({
                statusCode: 400,
                error: "Bad request",
                message: `Track id is invalid (not uuid version 4)`
            }, 400)
        }
        })) id): void{
        this.favoritesService.deleteTrackFromFavorites(id);
    }
}

@Controller('favs/album')
export class FavoriteAlbumsController{

    constructor(private readonly favoritesService: FavoritesService){}

    @Post(':id')
    addAlbumToFavorites(@Param("id", new ParseUUIDPipe({
        exceptionFactory() {
            throw new HttpException({
                statusCode: 400,
                error: "Bad request",
                message: `Album id is invalid (not uuid version 4)`
            }, 400)
        }
        })) id){
        return this.favoritesService.addAlbumToFavorites(id);
    }

    @Delete(":id")
    @HttpCode(204)
    deleteAlbumFromFavorites(@Param("id", new ParseUUIDPipe({
        exceptionFactory() {
            throw new HttpException({
                statusCode: 400,
                error: "Bad request",
                message: `Album id is invalid (not uuid version 4)`
            }, 400)
        }
        })) id): void{
        this.favoritesService.deleteAlbumFromFavorites(id);
    }
}

@Controller('favs/artist')
export class FavoriteArtistsController{

    constructor(private readonly favoritesService: FavoritesService){}

    @Post(':id')
    addArtistToFavorites(@Param("id", new ParseUUIDPipe({
        exceptionFactory() {
            throw new HttpException({
                statusCode: 400,
                error: "Bad request",
                message: `Artist id is invalid (not uuid version 4)`
            }, 400)
        }
        })) id){
        return this.favoritesService.addArtistToFavorites(id);
    }

    @Delete(":id")
    @HttpCode(204)
    deleteArtistFromFavorites(@Param("id", new ParseUUIDPipe({
        exceptionFactory() {
            throw new HttpException({
                statusCode: 400,
                error: "Bad request",
                message: `Artist id is invalid (not uuid version 4)`
            }, 400)
        }
        })) id): void{
        this.favoritesService.deleteArtistFromFavorites(id);
    }
}