import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventsModel} from '../../models/Events.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {

  @Input() event!: EventsModel;
  @Input() isAdmin = false;
  @Output() edit = new EventEmitter<EventsModel>();
  @Output() delete = new EventEmitter<number>();

}
