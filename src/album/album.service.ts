import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Album } from "./album.entity";
import {v4} from 'uuid'
import { CreateAlbumDto } from "./dto/createAlbum.dto";
import { ReturnAlbumDto } from "./dto/returnAlbum.dto";
import { forwardRef } from "@nestjs/common";
import { TrackService } from "src/track/track.service";
import { FavoritesService } from "src/favorites/favorites.service";

@Injectable()
export class AlbumService{
        
    private albums: Album[] = []

    constructor(
        @Inject(forwardRef(() => TrackService))private readonly trackService: TrackService,
        @Inject(forwardRef(() => FavoritesService))private readonly favsService: FavoritesService
        ){}

    readAll(): ReturnAlbumDto[]{
        return this.albums;
    }

    readOne(id: string): ReturnAlbumDto{
        let album = this.albums.find((item: Album) => item.id === id);
        if(!album){
            throw new HttpException({
                statusCode: 404,
                error: "Not found",
                message: `Album with id = ${id} doesn't exist`
            }, 404);
        }
        return album;
    }

    createAlbum(newAlbum: CreateAlbumDto): ReturnAlbumDto{       
        let album: Album = {
            id: v4(),
            ...newAlbum
        };
        this.albums.push(album);
        return album;
    }

    updateAlbum(id: string, albumInfo: CreateAlbumDto): ReturnAlbumDto{
        let album = this.albums.find((item: Album) => item.id === id);
        if(!album){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Album with id = ${id} doesn't exist`
            }, 404);
        }
        album.name = albumInfo.name;
        album.year = albumInfo.year;
        album.artistId = albumInfo.artistId;
        return album;
    }

    deleteAlbum(id: string): void{
        let foundIndex: number;
        let album = this.albums.find((item: Album,index: number) => {
            foundIndex = index;
            return item.id === id ? true : false;
        });
        if(!album){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Album with id = ${id} doesn't exist`
            }, 404);
        }
        this.trackService.updateAlbum(id);
        try{
        this.favsService.deleteAlbumFromFavorites(id);
        }catch(error){}
        this.albums.splice(foundIndex,1);
    }

    updateArtist(id: string){
        this.albums.forEach((item) => {
            if(item.artistId === id) item.artistId = null
        });
    }
}