import {Component, Input, OnInit} from '@angular/core';
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
  standalone: true,
  styleUrl: './upcoming-events.component.scss'
})
export class UpcomingEventsComponent implements OnInit{
  events: EventsModel[] = [];

  events$: Observable<EventsModel[]> | undefined;

  constructor(private fireStore: Firestore) { }

  ngOnInit(): void {
    // const eventsCollection = collection(this.fireStore, 'events');
    // this.events$ = collectionData(eventsCollection, { idField: 'id' }) as Observable<EventsModel[]>;

    const eventsCollection = collection(this.fireStore, 'events');

    collectionData(eventsCollection, { idField: 'id' }).subscribe((data: any) => {
      // Sort events in descending order (latest first)
      this.events = data.sort((a: EventsModel, b: EventsModel) => {
        const dateA = a.date ? new Date(a.date).getTime() : -Infinity; // undefined dates go last
        const dateB = b.date ? new Date(b.date).getTime() : -Infinity;
        return dateB - dateA;
      });
    });
  }


}
