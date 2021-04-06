//@ts-expect-error Class-validator doesn't offer types
import { IsString } from 'class-validator';
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
