import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsModel} from '../../models/Events.model';
import {UpcomingEventCardComponent} from '../upcoming-event-card/upcoming-event-card.component';
import {Observable} from 'rxjs';
import {collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-upcoming-events',
  imports: [CommonModule, UpcomingEventCardComponent,
  ],
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss'
})
export class UpcomingEventsComponent {

  events$: Observable<EventsModel[]> | undefined;

  constructor(private fireStore: Firestore) { }

  ngOnInit(): void {
    const eventsCollection = collection(this.fireStore, 'events');
    this.events$ = collectionData(eventsCollection, { idField: 'id' }) as Observable<EventsModel[]>;
  }

}
