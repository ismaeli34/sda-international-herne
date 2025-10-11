import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
export interface PhotoEvent {
  id: string;
  eventName: string;
  eventDate: string;
  eventDetails: string;
  imagesBase64: string[];
}

@Component({
  selector: 'app-sabbath-snapshots',
  imports: [CommonModule],
  templateUrl: './sabbath-snapshots.component.html',
  styleUrl: './sabbath-snapshots.component.scss'
})
export class SabbathSnapshotsComponent  implements OnInit {


  events$: Observable<PhotoEvent[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const eventsCollection = collection(this.firestore, 'photoEvents');
    this.events$ = collectionData(eventsCollection, { idField: 'id' }) as Observable<PhotoEvent[]>;
  }

}
