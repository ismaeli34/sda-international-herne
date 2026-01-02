import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  runTransaction,
  increment,
  serverTimestamp,
  collectionData,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChurchMemberService {

  private membersCollection;

  constructor(private firestore: Firestore) {
    this.membersCollection = collection(this.firestore, 'churchMembers');
  }

  /**
   * Get all church members
   */
  getMembers(): Observable<any[]> {
    return collectionData(this.membersCollection, { idField: 'id' });
  }

  /**
   * Add a new church member with auto-increment ID
   */
  async addMember(member: any): Promise<number> {
    let newId = 0;
    const counterRef = doc(this.firestore, 'churchMemberCounter');

    // Transaction for auto-increment ID
    await runTransaction(this.firestore, async transaction => {
      const snap = await transaction.get(counterRef);

      if (!snap.exists()) {
        transaction.set(counterRef, { value: 1 });
        newId = 1;
      } else {
        newId = (snap.data()['value'] || 0) + 1;
        transaction.update(counterRef, { value: increment(1) });
      }
    });

    const memberDocRef = doc(this.firestore, `churchMembers/${newId}`);

    await setDoc(memberDocRef, {
      id: newId,
      ...member,
      createdAt: serverTimestamp()
    });

    return newId;
  }

  /**
   * Delete a member
   */
  deleteMember(id: number) {
    const docRef = doc(this.firestore, `churchMembers/${id}`);
    return deleteDoc(docRef);
  }
}
