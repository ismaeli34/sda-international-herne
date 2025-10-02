import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-impressum',
  imports: [

  ],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

  churchName: string = 'Seventh Day Adventist, Herne';
  legalForm: string = 'Körperschaft des öffentlichen Rechts (KdöR)';
  address: string = 'Bochumer Str. 229,\n' + '44625 Herne';
  phone: string = '+49 162 1948601';
  email: string = 'kontakt@herne-international-sda.de';
  authorizedRepresentative: string = 'Pastor Andy Weber';
  website: string = '';

}
