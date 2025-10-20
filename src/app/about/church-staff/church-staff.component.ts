import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

interface ChurchStaffModel {
  id?: string;
  name: string;
  designation: string;   // 👈 matches Firestore field
  email: string;
  image: string;         // 👈 matches Firestore field
  safePhoto?: SafeUrl;   // 👈 used for sanitized image
}

@Component({
  selector: 'app-church-staff',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './church-staff.component.html',
  styleUrl: './church-staff.component.scss'
})
export class ChurchStaffComponent implements  OnInit{

  staffMembers: ChurchStaffModel[] = [];
  isLoggedIn = false;

  constructor(
    private fireStore: Firestore,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer // ✅ added
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    const staffCollection = collection(this.fireStore, 'churchStaff');
    collectionData(staffCollection, { idField: 'id' }).subscribe((data: any) => {
      this.staffMembers = data.map((staff: ChurchStaffModel) => ({
        ...staff,
        safePhoto: this.sanitizer.bypassSecurityTrustUrl(staff.image) // 👈 FIXED
      }));
      this.cdr.detectChanges();
      console.log('staffMembers', this.staffMembers);
    });
  }

  openPhoto(photoUrl: string) {
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<img src="${photoUrl}" style="width:100%">`);
    }
  }

  async onDelete(staffId: string) {
    if (confirm('Are you sure you want to delete this staff member?')) {
      const staffDocRef = doc(this.fireStore, `churchStaff/${staffId}`);
      await deleteDoc(staffDocRef);
      alert('Staff member deleted successfully!');
    }
  }

}
