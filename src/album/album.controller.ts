import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/createAlbum.dto";
import { ReturnAlbumDto } from "./dto/returnAlbum.dto";

@Controller('album')
export class AlbumController{

    constructor(private readonly albumService: AlbumService){}
    
    @Get()
    getAll(): ReturnAlbumDto[]{
        return this.albumService.readAll();
    }

    @Get(':id')
    getOne(@Param('id', new ParseUUIDPipe({
            version: "4",
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Artist id is invalid (not uuid version 4)`
                }, 400)}
            })) id): ReturnAlbumDto{
        return this.albumService.readOne(id);
    }

    @Post()
    createAlbum(@Body() newAlbum: CreateAlbumDto): ReturnAlbumDto{
        return this.albumService.createAlbum(newAlbum);
    }

    @Put(':id')
    updateAlbum(@Param('id', new ParseUUIDPipe({
        version: "4",
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Album id is invalid (not uuid version 4)`
                }, 400)}
    })) id, @Body() albumInfo: CreateAlbumDto){
        return this.albumService.updateAlbum(id, albumInfo); 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteAlbum(@Param('id', new ParseUUIDPipe({
            version: "4",
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Album id is invalid (not uuid version 4)`
                }, 400)}
    })) id): void{
        this.albumService.deleteAlbum(id);
    }
}