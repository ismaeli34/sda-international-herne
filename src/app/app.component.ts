import {AfterViewInit, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {UiService} from './services/ui.service';
import {CookiesConsentComponent} from './cookies-consent/cookies-consent.component';
import {FooterComponent} from './footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CookiesConsentComponent, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {





}
