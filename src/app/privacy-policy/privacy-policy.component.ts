import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [

  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  churchName: string = 'Seventh Day Adventist, Herne';
  contactEmail: string = 'kontakt@herne-international-sda.de';
  contactAddress: string = 'Bochumer Str. 229,\n' + '44625 Herne';
  dataProtectionOfficer: string = 'Rev Pastor Andy Weber';
  dpoEmail: string = 'kontakt@herne-international-sda.de';

}
