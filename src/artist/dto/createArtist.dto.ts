import { IsBoolean, IsDefined, IsString } from "class-validator";

export class CreateArtistDto{

    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsBoolean()
    grammy: boolean;
}