import { IsJSON, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSnippetDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  JSContent: string;

  @IsString()
  @ApiProperty()
  ReactContent: string;
}
