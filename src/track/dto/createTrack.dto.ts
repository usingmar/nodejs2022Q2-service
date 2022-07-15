import { IsDefined, IsInt, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateTrackDto {
    @IsDefined()
    @IsString() 
    name: string;

    @ValidateIf(o => o.artistId != null)
    @IsUUID()
    artistId: string | null;

    @ValidateIf(o => o.albumId != null)
    @IsUUID()
    albumId: string | null;

    @IsDefined()
    @IsInt()
    duration: number;
  }