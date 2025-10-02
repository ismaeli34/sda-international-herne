import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FooterComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
