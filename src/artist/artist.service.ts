import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Artist } from "./artist.entity";
import { CreateArtistDto } from "./dto/createArtist.dto";
import {v4} from 'uuid'
import { AlbumService } from "src/album/album.service";
import { forwardRef } from "@nestjs/common";
import { TrackService } from "src/track/track.service";
import { FavoritesService } from "src/favorites/favorites.service";

@Injectable()
export class ArtistService{
    
    private artists: Artist[] = []
    constructor(
        @Inject(forwardRef(() => AlbumService)) private readonly albumService: AlbumService,
        @Inject(forwardRef(() => TrackService))private readonly trackService: TrackService,
        @Inject(forwardRef(() => FavoritesService))private readonly favsService: FavoritesService
        ){}

    readAll(): Artist[]{
        return this.artists;
    }

    readOne(id: string): Artist{
        let artist = this.artists.find((item: Artist) => item.id === id);
        if(!artist){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Artist with id = ${id} doesn't exist`
            }, 404);
        }
        return artist;
    }

    createArtist(newArtist: CreateArtistDto): Artist{
        let artist: Artist = {
            id: v4(),
            ...newArtist
        };
        this.artists.push(artist);
        return artist;
    }

    updateArtist(id: string, artistInfo: CreateArtistDto){
        let artist = this.artists.find((item: Artist) => item.id === id);
        if(!artist){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Artist with id = ${id} doesn't exist`
            }, 404);
        }
        artist.name = artistInfo.name;
        artist.grammy = artistInfo.grammy;
        return artist;
    }

    deleteArtist(id: string){
        let foundIndex;
        let artist = this.artists.find((item: Artist,index: number) => {
            foundIndex = index;
            return item.id === id ? true : false;
        });
        if(!artist){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Artist with id = ${id} doesn't exist`
            }, 404);
        }
        this.albumService.updateArtist(id);
        this.trackService.updateArtist(id);
        try{
        this.favsService.deleteArtistFromFavorites(id);
        }catch(error){}
        this.artists.splice(foundIndex,1);
    }
}