import { IsString } from 'class-validator';
import {
  TransformClassToPlain,
  TransformPlainToClass,
  Type,
} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSnippetDto } from 'src/snippet/dto/create-snippet.dto';

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  title: string;

  @ApiProperty({
    type: [CreateSnippetDto],
  })
  @Type(() => CreateSnippetDto)
  snippets: CreateSnippetDto[];
}
