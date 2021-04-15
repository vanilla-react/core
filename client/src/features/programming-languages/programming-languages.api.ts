import { BaseApi } from '@/lib';
import { ProgrammingLanguage } from '@/types';

export class ProgrammingLanguagesApi extends BaseApi {
  prefix = '/post';

  public async getAllProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
    const { data } = await this._axios.get(
      this.endpoint('/programming-languages'),
    );
    return data;
  }
}
