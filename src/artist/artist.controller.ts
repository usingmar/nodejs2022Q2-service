import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Artist } from "./artist.entity";
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/createArtist.dto";

@Controller('artist')
export class ArtistController{

    constructor(private readonly artistService: ArtistService){}
    
    @Get()
    getAll(): Artist[]{
        return this.artistService.readAll();
    }

    @Get(':id')
    getOne(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Artist id is invalid (not uuid version 4)`
                }, 400)
            }
        })) id): Artist{
        return this.artistService.readOne(id);
    }

    @Post()
    createUser(@Body() newUser: CreateArtistDto): Artist{
        return this.artistService.createArtist(newUser);
    }

    @Put(':id')
    updateArtist(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Artist id is invalid (not uuid version 4)`
                }, 400)
            }
        })) id, @Body() artistInfo: CreateArtistDto){
        return this.artistService.updateArtist(id, artistInfo); 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `Artist id is invalid (not uuid version 4)`
                }, 400)
            }
        })) id): void{
        this.artistService.deleteArtist(id);
    }

}