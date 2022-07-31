import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { AlbumService } from "src/album/album.service";
import { ArtistService } from "src/artist/artist.service";
import { TrackService } from "src/track/track.service";
import { Favorites } from "./favorites.entity";

@Injectable()
export class FavoritesService{

    private favorites: Favorites = {
        artists: [],
        albums: [],
        tracks: []
    }

    constructor(
        @Inject(forwardRef(() => AlbumService)) private readonly albumService: AlbumService,
        @Inject(forwardRef(() => TrackService)) private readonly trackService: TrackService,
        @Inject(forwardRef(() => ArtistService)) private readonly artistService: ArtistService
    ){}

    readAll(){
        let returnTracks = this.favorites.tracks.map((item: string) => {
            return this.trackService.readOne(item);
        });
        let returnAlbums = this.favorites.albums.map((item: string) => {
            return this.albumService.readOne(item);
        });
        let returnArtists = this.favorites.artists.map((item: string) => {
            return this.artistService.readOne(item);
        });
        return {
            artists: returnArtists,
            albums: returnAlbums,
            tracks: returnTracks
        };
    }

    addTrackToFavorites(id: string){
        try{
        this.trackService.readOne(id);
        }catch(exception){
            throw new HttpException({
                statusCode: 422,
                error: exception.error,
                message: exception.message
            }, 422)
        }
        this.favorites.tracks.push(id);
        return {
            message: "Track was successfully added"
        }
    }

    deleteTrackFromFavorites(id:string){
        let foundIndex;
        let track = this.favorites.tracks.find((item, index) =>{
            foundIndex = index;
            return item === id ? true : false;
        });
        if(!track){
            throw new HttpException({
            statusCode: 404,
            error: "Bad request",
            message: `Track with id = ${id} is not favorite`
        }, 404);
        }
        this.favorites.tracks.splice(foundIndex,1);
    }

    addAlbumToFavorites(id: string){
        try{
        this.albumService.readOne(id);
        }catch(exception){
            throw new HttpException({
                statusCode: 422,
                error: exception.error,
                message: exception.message
            }, 422)
        }
        this.favorites.albums.push(id);
        return {
            message: "Album was successfully added"
        }
    }

    deleteAlbumFromFavorites(id:string){
        let foundIndex;
        let album = this.favorites.albums.find((item, index) =>{
            foundIndex = index;
            return item === id ? true : false;
        });
        if(!album){ throw new HttpException({
            statusCode: 404,
            error: "Bad request",
            message: `Album with id = ${id} is not favorite`
        }, 404);
        }
        this.favorites.albums.splice(foundIndex,1);
    }

    addArtistToFavorites(id: string){
        try{
        this.artistService.readOne(id);
        }catch(exception){
            throw new HttpException({
                statusCode: 422,
                error: exception.error,
                message: exception.message
            }, 422)
        }
        this.favorites.artists.push(id);
        return {
            message: "Artist was successfully added"
        }
    }

    deleteArtistFromFavorites(id:string){
        let foundIndex;
        let artist = this.favorites.artists.find((item, index) =>{
            foundIndex = index;
            return item === id ? true : false;
        });
        if(!artist){
            throw new HttpException({
            statusCode: 404,
            error: "Bad request",
            message: `Artist with id = ${id} is not favorite`
        }, 404);
        }
        this.favorites.artists.splice(foundIndex,1);
    }
}