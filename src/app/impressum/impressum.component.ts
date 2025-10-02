import { Component } from '@angular/core';

@Component({
  selector: 'app-impressum',
  imports: [],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

  churchName: string = 'Miracle Center Church International e.V Dortmund';
  legalForm: string = 'Körperschaft des öffentlichen Rechts (KdöR)';
  address: string = 'Gutenbergstraße 33, 44139 Dortmund';
  phone: string = '+49 01577 6393379';
  email: string = 'edoprince2000@yahoo.com';
  authorizedRepresentative: string = 'Pastor Prince Edos';
  website: string = '';

}
