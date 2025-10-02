import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-holy-communion-service',
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIconModule
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './holy-communion-service.component.html',
  styleUrl: './holy-communion-service.component.scss'
})
export class HolyCommunionServiceComponent {
  readonly panelOpenState = signal(false);


}
