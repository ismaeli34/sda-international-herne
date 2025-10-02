import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
  }

  // Initial language
  private currentLangSubject = new BehaviorSubject<string>('en');

  // Observable that components can subscribe to
  currentLang$ = this.currentLangSubject.asObservable();

  // Get current language value
  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  // Change language
  changeLanguage(lang: string) {
    this.currentLangSubject.next(lang); // this emits the new language
    this.translate.use(lang);
  }

}
