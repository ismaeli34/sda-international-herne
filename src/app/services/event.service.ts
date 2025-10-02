import {inject, Injectable} from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc, setDoc, docData
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import {EventsModel} from '../models/Events.model';
import {BehaviorSubject, from, Observable, of, switchMap} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  // Use a BehaviorSubject to hold the array and notify subscribers of changes
  private eventsSubject = new BehaviorSubject<EventsModel[]>([]);

  // Expose the events list as an observable
  events$: Observable<EventsModel[]> = this.eventsSubject.asObservable();

  constructor() { }

  addEvent(event: EventsModel) {
    // Get the current array of events
    const currentEvents = this.eventsSubject.getValue();

    // Add the new event
    const updatedEvents = [...currentEvents, event];

    // Push the new array to the BehaviorSubject
    this.eventsSubject.next(updatedEvents);
  }






}
