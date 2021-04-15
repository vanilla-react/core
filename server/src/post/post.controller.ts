import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Query,
  DefaultValuePipe,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../auth/decorators/user.decorator';
import { PostStatus } from '../types';
import { KudoService } from '../kudo/kudo.service';
import { KudoType } from '.prisma/client';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';

@ApiTags('post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly _kudoService: KudoService,
    private readonly _programmingLanguageService: ProgrammingLanguageService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User() userId: number, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(userId, createPostDto).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  //TODO: Fix query to receive a single validated query object
  @Get()
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiQuery({ name: 'status', enum: PostStatus, required: false })
  findAll(
    @Query('skip', new DefaultValuePipe(undefined)) skip: number,
    @Query('take', new DefaultValuePipe(undefined)) take: number,
    @Query('status') status: PostStatus,
  ) {
    return this.postService.getAll(skip, take, status);
  }

  @Get(':name/:slug')
  async findOne(@Param('name') name: string, @Param('slug') slug: string) {
    return this.postService.getOneByAuthorNameAndSlug(name, slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':name/:slug')
  async remove(@Param('name') name: string, @Param('slug') slug: string) {
    return this.postService.removeByAuthorNameAndSlug(name, slug);
  }

  @Put(':id/kudo/vote')
  @UseGuards(JwtAuthGuard)
  async vote(
    @User() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
    @Query('type') type: KudoType,
  ) {
    return this._kudoService.vote(id, userId, type);
  }

  @Delete(':id/kudo/vote')
  @UseGuards(JwtAuthGuard)
  async deleteVote(
    @User() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this._kudoService.deleteVote(userId, id);
  }

  @Get('/programming-languages')
  async getAllProgrammingLanguages() {
    return this._programmingLanguageService.getAll();
  }
}
