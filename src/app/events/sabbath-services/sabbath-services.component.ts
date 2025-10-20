import { Component } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { jsPDF } from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';

@Component({
  selector: 'app-sabbath-services',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './sabbath-services.component.html',
  styleUrls: ['./sabbath-services.component.scss']
})
export class SabbathServicesComponent {
  sabbathForm: FormGroup;
  divineForm: FormGroup;
  happySabbathForm: FormGroup;

  sabbathServices$: Observable<any[]>;
  divineServices$: Observable<any[]>;
  invitations$: Observable<any[]>;

  displayedColumns: string[] = [
    'songService','welcome','openingSong','openingPrayer','specialSong',
    'lessonReview','childrenCare','closingPrayer','closingSong','announcements','actions'
  ];

  divineDisplayedColumns: string[] = [
    'songService','prelude','welcomeCall','openingSong','invocation','offering',
    'scriptureReading','pastoralPrayer','specialSong','message','closingSong','benediction','responseHymn','actions'
  ];

  happySabbathDisplayedColumns: string[] = ['churchName','location','date','time','actions'];

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    // Forms
    this.sabbathForm = this.fb.group({
      songService: [''], welcome: [''], openingSong: [''], openingPrayer: [''],
      specialSong: [''], lessonReview: [''], childrenCare: [''],
      closingPrayer: [''], closingSong: [''], announcements: ['']
    });

    this.divineForm = this.fb.group({
      songService: [''], prelude: [''], welcomeCall: [''], openingSong: [''],
      invocation: [''], offering: [''], scriptureReading: [''],
      pastoralPrayer: [''], specialSong: [''], message: [''],
      closingSong: [''], benediction: [''], responseHymn: ['']
    });

    this.happySabbathForm = this.fb.group({
      churchName: [''], location: [''], date: [''], time: ['']
    });

    // Firestore streams
    this.sabbathServices$ = collectionData(collection(this.firestore, 'sabbathSchoolServices'), { idField: 'id' });
    this.divineServices$ = collectionData(collection(this.firestore, 'divineServices'), { idField: 'id' });
    this.invitations$ = collectionData(collection(this.firestore, 'happySabbathInvitations'), { idField: 'id' });
  }

  // Add documents
  async addSabbathService() { await addDoc(collection(this.firestore, 'sabbathSchoolServices'), this.sabbathForm.value); this.sabbathForm.reset(); }
  async addDivineService() { await addDoc(collection(this.firestore, 'divineServices'), this.divineForm.value); this.divineForm.reset(); }
  async addInvitation() { await addDoc(collection(this.firestore, 'happySabbathInvitations'), this.happySabbathForm.value); this.happySabbathForm.reset(); }

  // Delete documents
  async deleteSabbathService(id: string) { if(confirm('Delete this Sabbath School Service?')) await deleteDoc(doc(this.firestore, 'sabbathSchoolServices', id)); }
  async deleteDivineService(id: string) { if(confirm('Delete this Divine Service?')) await deleteDoc(doc(this.firestore, 'divineServices', id)); }
  async deleteInvitation(id: string) { if(confirm('Delete this Happy Sabbath Invitation?')) await deleteDoc(doc(this.firestore, 'happySabbathInvitations', id)); }

  // Generate PDF



  async generatePDF(section: 'sabbath' | 'divine' | 'happy') {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    if (section === 'happy') {
      // ======== HAPPY SABBATH FLYER ========
      const logo = '/adventist_blue_logo.png'; // put your logo here
      const imgWidth = 30;
      const imgHeight = 30;
      const imgX = pageWidth - imgWidth - 20;
      const imgY = 15;

      try {
        doc.addImage(logo, 'PNG', imgX, imgY, imgWidth, imgHeight);
      } catch (e) {
        console.warn('Logo not found or invalid path.');
      }

      // Happy Sabbath title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(0, 102, 204);
      doc.text('Happy Sabbath', 20, 30);

      // Church Name
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(14);
      doc.setTextColor(100);
      doc.text(
        'The International Seventh-Day Adventist Church in Herne',
        pageWidth / 2,
        50,
        { align: 'center' }
      );

      // Invitation
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(12);
      doc.setTextColor(120);
      doc.text('is inviting You to', pageWidth / 2, 65, { align: 'center' });

      // Sabbath Services
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(0, 102, 204);
      doc.text('Sabbath Services', pageWidth / 2, 80, { align: 'center' });

      // Hope Center Herne
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('in', pageWidth / 2, 92, { align: 'center' });
      doc.text('Hope Center Herne', pageWidth / 2, 105, { align: 'center' });

      // Address
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text('Bochumer Straße 229,', pageWidth / 2, 118, { align: 'center' });
      doc.text('44625 Herne', pageWidth / 2, 126, { align: 'center' });

      // Get latest date/time from Firestore
      const invitations = await firstValueFrom(this.invitations$);
      const latest = invitations[invitations.length - 1];
      const date = latest?.date || 'October 18ᵗʰ, 2025';
      const time = latest?.time || '09:45 AM';

      // Date and Time
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(12);
      doc.text(`on ${date}`, pageWidth / 2, 145, { align: 'center' });
      doc.text(`at ${time}`, pageWidth / 2, 153, { align: 'center' });

      doc.save('Happy_Sabbath_Service.pdf');
      return; // stop here for happy sabbath
    }

    // ======== DEFAULT TABLE-STYLE PDFs ========
    let title = '';
    let data: any[] = [];
    let fields: string[] = [];

    if (section === 'sabbath') {
      title = 'Sabbath School Services';
      data = await firstValueFrom(this.sabbathServices$);
      fields = this.displayedColumns.filter(c => c !== 'actions');
    } else if (section === 'divine') {
      title = 'Divine Services';
      data = await firstValueFrom(this.divineServices$);
      fields = this.divineDisplayedColumns.filter(c => c !== 'actions');
    }

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(title, pageWidth / 2, 20, { align: 'center' });

    let yPos = 30;
    const lineHeight = 8;
    const labelX = 14;
    const valueX = 70;

    data.forEach((item, index) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      fields.forEach(field => {
        const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        const value = item[field] || '';
        doc.text(`${label}:`, labelX, yPos);
        doc.text(`${value}`, valueX, yPos);
        yPos += lineHeight;
      });

      yPos += lineHeight;
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save(`${title}.pdf`);
  }



}
