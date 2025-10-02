import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-child-dedication',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIconModule,
    MatAccordion
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './child-dedication.component.html',
  styleUrl: './child-dedication.component.scss'
})
export class ChildDedicationComponent {
  readonly panelOpenState = signal(false);


}
