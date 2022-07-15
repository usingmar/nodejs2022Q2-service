import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateTrackDto } from "./dto/createTrack.dto";
import { ReturnTrackDto } from "./dto/returnTrack.dto";
import { TrackService } from "./track.service";

@Controller('track')
export class TrackController{

    constructor(private readonly trackService: TrackService){}
    
    @Get()
    getAll(){
        return this.trackService.readAll();
    }

    @Get(':id')
    getOne(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Track id is invalid (not uuid version 4)`
                }, 400)
            }
            })) id){
        return this.trackService.readOne(id);
    }

    @Post()
    createTrack(@Body() newTrack: CreateTrackDto){
        return this.trackService.createTrack(newTrack);
    }

    @Put(':id')
    updateTrack(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Track id is invalid (not uuid version 4)`
                }, 400)
            }
            })) id, @Body() trackInfo: CreateTrackDto){
        return this.trackService.updateTrack(id, trackInfo); 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteTrack(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Track id is invalid (not uuid version 4)`
                }, 400)
            }
            })) id): void{
        this.trackService.deleteTrack(id);
    }
}