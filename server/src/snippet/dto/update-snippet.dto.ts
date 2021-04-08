import { PartialType } from '@nestjs/swagger';
import { CreateSnippetDto } from './create-snippet.dto';

export class UpdateSnippetDto extends PartialType(CreateSnippetDto) {}
