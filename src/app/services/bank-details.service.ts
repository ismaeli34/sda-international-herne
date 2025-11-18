import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {



  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'bankdetails');
  }

  // Get all service dates
  getBankDetails(): Observable<any[]> {
    return collectionData(this.collectionRef, { idField: 'id' });
  }
}
