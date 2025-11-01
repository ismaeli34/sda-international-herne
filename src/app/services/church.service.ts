import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';


import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChurchService {

  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'churchInfoDateServices');
  }

  // Get all service dates
  getServices(): Observable<any[]> {
    return collectionData(this.collectionRef, { idField: 'id' });
  }

  // Add a new date
  addService(date: string) {
    return addDoc(this.collectionRef, { date, active: true });
  }

  // Update an existing date
  updateService(id: string, newDate: string) {
    const docRef = doc(this.firestore, `churchInfoDateServices/${id}`);
    return updateDoc(docRef, { date: newDate });
  }

  // Delete a date
  deleteService(id: string) {
    const docRef = doc(this.firestore, `churchInfoDateServices/${id}`);
    return deleteDoc(docRef);
  }

}
