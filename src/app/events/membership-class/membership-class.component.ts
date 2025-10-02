import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-membership-class',
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIconModule
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './membership-class.component.html',
  styleUrl: './membership-class.component.scss'
})
export class MembershipClassComponent {

  readonly panelOpenState = signal(false);


}
