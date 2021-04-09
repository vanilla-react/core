import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';
import { PrismaService } from '../prisma.service';

@ApiTags('snippet')
@Controller('snippet')
@ApiBearerAuth()
export class SnippetController {
  constructor(
    private readonly snippetService: SnippetService,
    private readonly _prismaService: PrismaService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() userId: number, @Body() createSnippetDto: any) {
    return userId;
  }

  @Get()
  findAll() {
    return this._prismaService.post.findMany({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetService.update(+id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetService.remove(+id);
  }
}
