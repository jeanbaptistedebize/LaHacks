import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class PlantModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  commonname: string;

  @ApiProperty()
  @IsString()
  scientificname: string;

  @ApiProperty()
  @IsBoolean()
  isleaf: Boolean;

  @ApiProperty()
  @IsString()
  family: string;

  @ApiProperty()
  @IsString()
  genus: string;

  @ApiProperty()
  @IsString()
  species: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  disease: string;

  @ApiProperty()
  @IsString()
  rarity: string;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  coord: number[];

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  createdAt: Date;
}

export class CreatePlantModel extends PickType(PlantModel, [
  'image',
  'coord',
]) {}

export class CreatePlantResponse {
  name: string;
}

export class GetAllPlants {
  @ApiProperty()
  plants: Pick<
    PlantModel,
    'id' | 'coord' | 'commonname' | 'scientificname' | 'rarity' | 'createdAt'
  >[];
}
