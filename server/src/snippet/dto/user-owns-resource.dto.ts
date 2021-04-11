import { IsNumber } from 'class-validator';

export class UserOwnsResourceDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  postId: number;
  @IsNumber()
  programmingLanguageId: number;

  static create(userId: number, postId: number, programmingLanguageId: number) {
    const dto = new UserOwnsResourceDto();
    dto.userId = userId;
    dto.postId = postId;
    dto.programmingLanguageId = programmingLanguageId;
    return dto;
  }
}
