import { Injectable } from '@nestjs/common';
import { ProgrammingLanguageRepository } from './programming-language.repository';

@Injectable()
export class ProgrammingLanguageService {
  constructor(
    private readonly _programmingLanguageRepo: ProgrammingLanguageRepository,
  ) {}

  public async getAll() {
    return this._programmingLanguageRepo.getAll();
  }
}
