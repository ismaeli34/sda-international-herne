import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {LanguageService} from '../services/language.service';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // change color after 50px scroll
  }

  languages: Language[] = [
    { lang: 'en', name: 'English', flag: '🇬🇧',  value: 'en', },
    { lang: 'de', name: 'German', flag: '🇩🇪', value: 'de' },

  ];
  lang ='en';

  showAboutMenu = false;
  showConnectMenu = false;
  showEventMenu = false;
  isMenuOpen = false;
  dropdownOpen = false;

  isLoggedIn = false;


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  constructor(private location: Location,
              private router: Router,
              private translateService: TranslateService,
              private cdr: ChangeDetectorRef,
              private languageService: LanguageService,
              private authService:AuthService

  ) {


  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);

  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLang(selectedLanguage: string) {
    this.languageService.changeLanguage(selectedLanguage);
  }


  ngOnInit() {
    // Subscribe to language changes from the service
    this.lang = this.languageService.getCurrentLang();


    this.languageService.currentLang$.subscribe(lang => {
      this.lang = lang;
      this.cdr.detectChanges();
      console.log("HEADER LANG", this.lang);
    });


    // 🔑 subscribe to login state
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });
  }

  logout(){
    this.authService.logout();
  }


}
interface Language {
  lang: string;
  name:string;
  flag:string;
  value:string;
}
