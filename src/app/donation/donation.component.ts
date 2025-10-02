import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-donation',
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIconModule
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})
export class DonationComponent {
  readonly panelOpenState = signal(false);
 // bankdetails = environment.bankDetails;



}
