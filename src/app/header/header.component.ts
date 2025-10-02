import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AuthService} from '../services/auth.service';
import {LanguageService} from '../services/language.service';
import {CommonModule} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [ // when element enters DOM
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit{

  isMobile: boolean = false;


  languages: Language[] = [
    { lang: 'en', name: 'English', flag: '🇬🇧',  value: 'en', },
    { lang: 'de', name: 'German', flag: '🇩🇪', value: 'de' },

  ];
  menuOpen = false;

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

  constructor(private router: Router,
              private translateService: TranslateService,
              private cdr: ChangeDetectorRef,
              private languageService: LanguageService,
              private authService:AuthService,

  ) {


  }


  isActive(route: string): boolean {
    return this.router.isActive(route, false);

  }




  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Menu toggled:", this.isMenuOpen);
  }

  changeLang(selectedLanguage: string) {
    this.languageService.changeLanguage(selectedLanguage);
  }


  ngOnInit() {
    // Subscribe to language changes from the service

    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
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

  checkScreen() {
    this.isMobile = window.innerWidth <= 1024;
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
