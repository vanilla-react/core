import * as AuthModule from '../auth/auth.module';
import * as SharedModule from '../shared/shared.module';

export const useInitialAuth = AuthModule.useInitialAuth;
export const config = new SharedModule.ConfigService();
export const httpClient = new SharedModule.HttpClientService(config);
export const authApi = new AuthModule.AuthApi(httpClient);
export const authService = new AuthModule.AuthService(
  authApi,
  config,
  httpClient,
);

// export const container = new Container();

// container.load(sharedModule, authModule);

// TODO: Refactor architecture
// TODO: Rethink Axios interceptors
// TODO: Check types for observables with decorators
// TODO: Maybe add some tests

/* NEW
  > src

    > di
      > index.ts

    > auth
      > auth.module.ts
      > auth.api.ts
      > auth.service.ts

    > shared
      > shared.module.ts
      > config.service.ts
      > components 
        > layouts
          > generic.layout.tsx
        > pages
          > home
        > generic
          > spinner
            > spinner.component.tsx

    > pages
      > index.tsx
      > _app.tsx

    > global.css
*/

/* 
  > src

    > di
      > index.ts

    > shared
      > shared.module.ts
      > shared.service.ts
      > hooks

    > auth
      > auth.module.ts
      > auth.api.ts
      > auth.service.ts
      > hooks
        > useInitialAuth.hook.ts

    > snippets
      > snippets.module.ts
      > snippets.api.ts
      > snippets.service.ts

    > presentation
      > presentation.module.ts
      > components 
        > layouts
          > generic.layout.tsx
        > pages
          > home
        > generic
          > spinner
            > spinner.component.tsx

    > pages
      > index.tsx
      > _app.tsx

    > global.css
    > types.ts
*/
