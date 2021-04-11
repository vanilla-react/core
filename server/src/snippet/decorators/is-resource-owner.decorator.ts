import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { OwnerGuard } from '../guards/owner.guard';

export function IsOwner() {
  return applyDecorators(UseGuards(JwtAuthGuard, OwnerGuard));
}
