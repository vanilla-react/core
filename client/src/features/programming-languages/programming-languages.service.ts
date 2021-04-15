import { ProgrammingLanguage } from '@/types';
import { action, makeObservable, observable, reaction } from 'mobx';
import { Base64Service } from '../shared/base64.service';
import { ProgrammingLanguagesApi } from './programming-languages.api';

export class ProgrammingLanguagesService {
  @observable
  languages: ProgrammingLanguage[] = [];

  @observable
  loading = true;

  constructor(
    private readonly _programmingLanguagesApi: ProgrammingLanguagesApi,
    private readonly _base64Service: Base64Service,
  ) {
    makeObservable(this);
  }

  @action
  public async getAllProgrammingLanguages() {
    let langs = await this._programmingLanguagesApi.getAllProgrammingLanguages();
    langs = langs.map((lang) => ({
      ...lang,
      template: Base64Service.ToReadable(lang.template),
    }));
    this.setNewProgrammingLanguages(langs);
    this.loading = false;
  }

  @action
  private setNewProgrammingLanguages(languages: ProgrammingLanguage[]) {
    this.languages = languages;
  }
}
