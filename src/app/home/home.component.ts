import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import {CommonModule} from '@angular/common';
import {WhatsappComponent} from '../whatsapp/whatsapp.component';
import {ZoomComponent} from '../zoom/zoom.component';
import {ZoomCardComponent} from '../zoom-card/zoom-card.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule, WhatsappComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [ // when element enters DOM
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent {

}
