import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-church-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './church-member-list.component.html',
  styleUrls: ['./church-member-list.component.scss']
})
export class ChurchMemberListComponent implements OnInit {
  members$: Observable<any[]> | undefined;

  selectedMember: any = null; // member selected for update
  photoPreview: string | null = null;

  ministryOptions = [
    'Worship', 'Preaching','Kids', 'Media', 'Outreach','Hospitality',
    'Youth','Young Adults','Prayer Team','Discipleship','Evangelism',
    'Small Groups','Follow‑Up / New Believers','Ushering / Welcome Team',
    'Tech / Sound','Livestream / Production','Social Media','Graphic Design',
    'Events & Logistics','Men’s Ministry','Women’s Ministry','Marriage Ministry',
    'Counseling / Care','Community Service','Music / Band','Missions',
    'Dance / Creative Arts','Facilities / Setup Team'
  ];

  availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Evenings'];

  constructor(private firestore: Firestore, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const membersCollection = collection(this.firestore, 'churchMembers');
    this.members$ = collectionData(membersCollection, { idField: 'id' }) as Observable<any[]>;
  }

  /** Delete member */
  async deleteMember(member: any) {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;

    try {
      const docRef = doc(this.firestore, `churchMembers/${member.id}`);
      await deleteDoc(docRef);
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member.');
    }
  }

  /** Select member for editing */
  selectMember(member: any) {
    this.selectedMember = { ...member }; // clone to prevent live edits
    this.photoPreview = member.photoBase64 || null;
  }

  /** Cancel update */
  cancelUpdate(form: NgForm) {
    this.selectedMember = null;
    this.photoPreview = null;
    form.resetForm();
  }

  /** Handle Base64 photo selection */
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    if (file.size > 500 * 1024) {
      alert('Please upload an image smaller than 500 KB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
      if (this.selectedMember) this.selectedMember.photoBase64 = reader.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  /** Handle checkbox arrays */
  toggleArrayValue(array: string[], value: string) {
    const index = array.indexOf(value);
    index === -1 ? array.push(value) : array.splice(index, 1);
    this.cdr.detectChanges();
  }

  /** Handle comma-separated languages */
  onLanguagesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.selectedMember)
      this.selectedMember.languages = input.value
        .split(',')
        .map(lang => lang.trim())
        .filter(lang => lang.length > 0);
  }

  /** Update member in Firestore */
  async updateMember(form: NgForm) {
    if (!this.selectedMember) return;

    try {
      const docRef = doc(this.firestore, `churchMembers/${this.selectedMember.id}`);
      await setDoc(docRef, {
        ...this.selectedMember,
        updatedAt: serverTimestamp()
      });
      alert('Member updated successfully!');
      this.selectedMember = null;
      this.photoPreview = null;
      form.resetForm();
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Failed to update member.');
    }
  }
}
