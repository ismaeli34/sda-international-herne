import {Component, signal} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-baptism',
    imports: [
      MatAccordion,
      MatExpansionPanel,
      MatExpansionPanelHeader,
      MatExpansionPanelTitle,
      MatIconModule
    ],
  templateUrl: './baptism.component.html',
  styleUrl: './baptism.component.scss'
})
export class BaptismComponent {

  readonly panelOpenState = signal(false);


}
