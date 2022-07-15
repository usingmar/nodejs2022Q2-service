import { IsDefined, IsInt, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateAlbumDto{
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsInt()
    year: number;

    @ValidateIf(o => o.artistId != null)
    @IsUUID('4')
    artistId: string | null;
}