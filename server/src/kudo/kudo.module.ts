import { Module } from '@nestjs/common';
import { KudoService } from './kudo.service';
import { KudoRepository } from './kudo.repository';
import { PrismaService } from '../prisma.service';

// - [ ] You can add kudos at all times, only one per user. You can also downvote.
// - [ ] When a post reaches X amount of kudos it has to change it's status

@Module({
  providers: [KudoService, KudoRepository, PrismaService],
  exports: [KudoService],
})
export class KudoModule {}
