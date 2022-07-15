import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { AlbumService } from "src/album/album.service";
import { ArtistService } from "src/artist/artist.service";
import { FavoritesService } from "src/favorites/favorites.service";
import { v4 } from "uuid";
import { CreateTrackDto } from "./dto/createTrack.dto";
import { Track } from "./track.entity";

@Injectable()
export class TrackService{

    private tracks: Track[] = []

    constructor(
        @Inject(forwardRef(() => FavoritesService))private readonly favsService: FavoritesService,
    ){}

    readAll(){
        return this.tracks;
    }

    readOne(id: string){
        let track = this.tracks.find((item: Track) => item.id === id);
        if(!track){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Track with id = ${id} doesn't exist`
            }, 404);
        }
        return track;
    }

    createTrack(newTrack: CreateTrackDto){       
        let track: Track = {
            id: v4(),
            ...newTrack
        };
        this.tracks.push(track);
        return track;
    }

    updateTrack(id: string, trackInfo: CreateTrackDto){
        let track = this.tracks.find((item: Track) => item.id === id);
        if(!track){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Track with id = ${id} doesn't exist`
            }, 404);
        }
        track.name = trackInfo.name;
        track.artistId = trackInfo.artistId;
        track.albumId = trackInfo.albumId;
        track.duration = trackInfo.duration;
        return track;
    }

    deleteTrack(id: string): void{
        let foundIndex;
        let track = this.tracks.find((item: Track,index: number) => {
            foundIndex = index;
            return item.id === id ? true : false;
        });
        if(!track){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Track with id = ${id} doesn't exist`
            }, 404);
        }
        try{
        this.favsService.deleteTrackFromFavorites(id);
        }catch(error){}
        this.tracks.splice(foundIndex,1);
    }

    updateArtist(id: string){
        this.tracks.forEach((item) => {
            if(item.artistId === id) item.artistId = null
        });
    }

    updateAlbum(id: string){
        this.tracks.forEach((item) => {
            if(item.albumId === id) item.albumId = null
        });    
    }
}