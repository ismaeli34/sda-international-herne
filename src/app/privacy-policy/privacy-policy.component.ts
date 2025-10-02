import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  churchName: string = 'Miracle Center Church International e.V Dortmund';
  contactEmail: string = 'edoprince2000@yahoo.com';
  contactAddress: string = 'Gutenbergstraße 33, 44139 Dortmund, Germany';
  dataProtectionOfficer: string = 'Rev Pastor Prince Edos';
  dpoEmail: string = 'edoprince2000@yahoo.com';

}
