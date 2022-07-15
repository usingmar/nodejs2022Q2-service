import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Album } from "./album.entity";
import {v4} from 'uuid'
import { ArtistService } from "src/artist/artist.service";
import { CreateAlbumDto } from "./dto/createAlbum.dto";
import { ReturnAlbumDto } from "./dto/returnAlbum.dto";
import { forwardRef } from "@nestjs/common";

@Injectable()
export class AlbumService{
        
    private albums: Album[] = []

    constructor(@Inject(forwardRef(() => ArtistService))private readonly artistService: ArtistService){}

    readAll(): ReturnAlbumDto[]{
        let returnAlbums: ReturnAlbumDto[];
        returnAlbums = this.albums.map((item: Album) => {
            if(item.artistId){
                let artist = this.artistService.readOne(item.artistId);
                let returnAlbum: ReturnAlbumDto = {
                    id: item.id,
                    name: item.name,
                    year: item.year,
                    artist: artist
                }
                return returnAlbum;
            }
            let returnAlbum: ReturnAlbumDto;
            returnAlbum = {
                id: item.id,
                name: item.name,
                year: item.year,
                artist: null
            } 
            return returnAlbum; 
        });
        return returnAlbums;
    }

    readOne(id: string): ReturnAlbumDto{
        let album = this.albums.find((item: Album) => item.id === id);
        if(!album){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Record with id = ${id} doesn't exist`
            }, 404);
        }
        if(album.artistId){
            let artist = this.artistService.readOne(album.artistId);
            return {
                id: album.id,
                name: album.name,
                year: album.year,
                artist: artist
            }
        } 
        return {
            id: album.id,
            name: album.name,
            year: album.year,
            artist: null
        }; 
    }

    createAlbum(newAlbum: CreateAlbumDto): ReturnAlbumDto{       
        if(newAlbum.artistId)
        var artist = this.artistService.readOne(newAlbum.artistId)
        else artist = null
        let album: Album = {
            id: v4(),
            ...newAlbum
        };
        this.albums.push(album);
        return {
            id: album.id,
            name: album.name,
            year: album.year,
            artist: artist 
        };
    }

    updateAlbum(id: string, albumInfo: CreateAlbumDto): ReturnAlbumDto{
        let album = this.albums.find((item: Album) => item.id === id);
        if(!album){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Record with id = ${id} doesn't exist`
            }, 404);
        }
        album.name = albumInfo.name;
        album.year = albumInfo.year;
        album.artistId = albumInfo.artistId;
        if(albumInfo.artistId)
        return {
            id: album.id,
            name: album.name,
            year: album.year,
            artist: this.artistService.readOne(album.artistId)
        };
        return {
            id: album.id,
            name: album.name,
            year: album.year,
            artist: null
        };
    }

    deleteAlbum(id: string): void{
        let foundIndex;
        let album = this.albums.find((item: Album,index: number) => {
            foundIndex = index;
            return item.id === id ? true : false;
        });
        if(!album){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Record with id = ${id} doesn't exist`
            }, 404);
        }
        this.albums.splice(foundIndex,1);
    }

    updateArtist(id: string){
        this.albums.forEach((item) => {
            if(item.artistId === id) item.artistId = null
        });

    }
}