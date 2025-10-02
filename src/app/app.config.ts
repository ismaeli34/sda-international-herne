import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {

  // public folder i18n
  //return new TranslateHttpLoader(http, 'i18n/', '.json');
  // assets folder i18n
  return new TranslateHttpLoader(http, '../../../i18n/', '.json');

}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),     provideHttpClient(),
    importProvidersFrom(  TranslateModule.forRoot({
      fallbackLang: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    provideRouter(routes,  withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }))]
};

