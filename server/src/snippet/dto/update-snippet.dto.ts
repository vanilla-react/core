import { CreateSnippetDto } from './create-snippet.dto';

export class UpdateSnippetDto extends CreateSnippetDto {
  static create(content: string, programmingLanguageId: number) {
    const dto = new UpdateSnippetDto();

    dto.content = content;
    dto.programmingLanguageId = programmingLanguageId;

    return dto;
  }
}
