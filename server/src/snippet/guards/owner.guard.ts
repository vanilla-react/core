import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { UserOwnsResourceDto } from '../dto/user-owns-resource.dto';
import { SnippetService } from '../snippet.service';

@Injectable()
export class OwnerGuard extends JwtAuthGuard implements CanActivate {
  constructor(private readonly _snippetService: SnippetService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user,
      params,
      body,
    } = context.switchToHttp().getRequest() as Request;

    if (!user) {
      return false;
    }

    const isOwner = await this._snippetService.userOwnsResourceById(
      UserOwnsResourceDto.create(
        +user.id,
        +params.id,
        body.programmingLanguageId,
      ),
    );

    if (!isOwner) {
      return false;
    }

    return true;
  }
}
