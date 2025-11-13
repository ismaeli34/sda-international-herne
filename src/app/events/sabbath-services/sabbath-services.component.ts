import {Component, OnInit} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Observable, firstValueFrom, combineLatest} from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { jsPDF } from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';
import {map} from 'rxjs/operators';

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
export class SabbathServicesComponent implements OnInit{
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

  coverForm: FormGroup;


  showCombinedPDF$: Observable<boolean>;


  divineDisplayedColumns: string[] = [
    'songService','prelude','welcomeCall','openingSong','invocation','offering',
    'scriptureReading','pastoralPrayer','specialSong','message','closingSong','benediction','responseHymn','pictureTakings','actions'
  ];

  ngOnInit() {
    const coverDocRef = doc(this.firestore, 'churchBulletinCover', 'currentCover');
    docData(coverDocRef).subscribe((data: any) => {
      if (data) {
        this.coverForm.patchValue(data);
      }
    });
  }


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
      closingSong: [''], benediction: [''], responseHymn: [''],
      pictureTakings: ['']  // ← Added field

    });

    this.happySabbathForm = this.fb.group({
      churchName: [''], location: [''], date: [''], time: ['']
    });


    this.coverForm = this.fb.group({
      theme: [''],
      date: ['']
    });

    // Firestore streams
    this.sabbathServices$ = collectionData(collection(this.firestore, 'sabbathSchoolServices'), { idField: 'id' });
    this.divineServices$ = collectionData(collection(this.firestore, 'divineServices'), { idField: 'id' });
    this.invitations$ = collectionData(collection(this.firestore, 'happySabbathInvitations'), { idField: 'id' });

    this.showCombinedPDF$ = combineLatest([
      this.sabbathServices$,
      this.divineServices$,
      this.invitations$
    ]).pipe(
      map(([sabbath, divine, happy]) =>
        (sabbath && sabbath.length > 0) &&
        (divine && divine.length > 0) &&
        (happy && happy.length > 0)
      )
    );

  }

  // Add this method inside your component
  async saveCover() {
    const coverData = this.coverForm.value;

    // Use a fixed doc ID if you only want a single cover
    const docRef = doc(this.firestore, 'churchBulletinCover', 'currentCover');

    try {
      await setDoc(docRef, coverData);
      alert('Church Bulletin cover saved successfully!');
    } catch (error) {
      console.error('Error saving cover:', error);
      alert('Failed to save cover.');
    }
  }

  // Add documents
  async addSabbathService() {
    const docRef = doc(this.firestore, 'sabbathSchoolServices', 'singleRecord'); // fixed ID
    await setDoc(docRef, this.sabbathForm.value);
    this.sabbathForm.reset();
  }
  async addDivineService() {
    const docRef = doc(this.firestore, 'divineServices', 'singleRecord'); // fixed ID
    await setDoc(docRef, this.divineForm.value);
    this.divineForm.reset();
  }

  async addInvitation() {
    const docRef = doc(this.firestore, 'happySabbathInvitations', 'singleRecord'); // fixed ID
    await setDoc(docRef, this.happySabbathForm.value);
    this.happySabbathForm.reset();
  }
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



  async generateCombinedPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 20;
    const lineHeight = 8;

    // ======== COVER PAGE ========
    const theme = this.coverForm.get('theme')?.value || '';
    const date = this.coverForm.get('date')?.value || '';

    // === Load cover image ===
    const coverPath = '/church_bulletin_main.jpeg';
    try {
      const coverData = await fetch(coverPath)
        .then(res => res.blob())
        .then(blob => new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        }));
      doc.addImage(coverData, 'JPEG', 0, 0, pageWidth, pageHeight);
    } catch (e) {
      console.warn('Cover image not found:', e);
    }

    // === Overlay theme and date ===
    const bottomY = pageHeight - 30;
    doc.setFont('times', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(0);
    doc.text(theme, pageWidth / 2, bottomY, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(24);
    doc.text(date.toUpperCase(), pageWidth / 2, bottomY + 15, { align: 'center' });

    // ======== FETCH DATA ========
    const [sabbathData, divineData, invitationsData] = await Promise.all([
      firstValueFrom(this.sabbathServices$),
      firstValueFrom(this.divineServices$),
      firstValueFrom(this.invitations$)
    ]);

    // ======== LOAD SECTION BACKGROUND IMAGE ========
    const bulletinPath = '/bulletin_page.jpeg';
    let bulletinImageData: string | null = null;

    try {
      bulletinImageData = await fetch(bulletinPath)
        .then(res => res.blob())
        .then(blob => new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        }));
    } catch (e) {
      console.warn('Bulletin page image not found:', e);
    }

    // ======== HELPER FUNCTION ========
    let yPos = 30;

    const addSection = (title: string, items: any[], fields: string[]) => {
      if (!items || items.length === 0) return;

      // Add a new page with background image
      doc.addPage();
      if (bulletinImageData) {
        doc.addImage(bulletinImageData, 'JPEG', 0, 0, pageWidth, pageHeight);
      }

      yPos = 40;

      // Section Header
      doc.setFont('times', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 102);
      doc.text(title, pageWidth / 2, yPos, { align: 'center' });

      yPos += lineHeight * 2;

      const labelX = 25; // left column for labels
      const valueX = 90; // aligned column for values
      const lineGap = 8; // line spacing

      items.forEach(item => {
        fields.forEach(field => {
          const label = field
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
          const value = item[field] || '';

          doc.setFont('times', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(0);
          doc.text(`${label}:`, labelX, yPos);

          doc.setFont('times', 'normal');
          doc.text(String(value), valueX, yPos);

          yPos += lineGap;
        });

        // Extra space between records
        yPos += lineGap;

        // Page break if needed
        if (yPos > pageHeight - 30) {
          doc.addPage();
          if (bulletinImageData) {
            doc.addImage(bulletinImageData, 'JPEG', 0, 0, pageWidth, pageHeight);
          }
          yPos = 40;
        }
      });
    };

    // ======== ADD SECTIONS (each with same background) ========
    const happyFields = this.happySabbathDisplayedColumns.filter(c => c !== 'actions');
    addSection('Happy Sabbath Invitation', invitationsData, happyFields);

    const sabbathFields = this.displayedColumns.filter(c => c !== 'actions');
    addSection('Sabbath School Services', sabbathData, sabbathFields);

    const divineFields = this.divineDisplayedColumns.filter(c => c !== 'actions');
    addSection('Divine Services', divineData, divineFields);

    // ======== OPEN PDF IN NEW TAB ========
    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
  }



  async previewCover() {
    const theme = this.coverForm.get('theme')?.value || '';
    const date = this.coverForm.get('date')?.value || '';

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // === 1️⃣ Add church bulletin image from public folder ===
    const imagePath = '/church_bulletin_main.jpeg'; // served from public folder
    try {
      doc.addImage(imagePath, 'JPEG', 0, 0, pageWidth, pageHeight);
    } catch (e) {
      console.warn('Church bulletin image not found or invalid path:', e);
    }

    // === 2️⃣ Overlay theme and date ===
    const bottomY = pageHeight - 30;

    doc.setFont('Helvetica', );
    doc.setFontSize(30);
    doc.setTextColor(0);
    doc.text(theme, pageWidth / 2, bottomY, { align: 'center' });

    doc.setFont('Helvetica', );
    doc.setFontSize(30);
    doc.text(date.toUpperCase(), pageWidth / 2, bottomY + 15, { align: 'center' });

    // === 3️⃣ Preview PDF in new tab ===
    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
  }



  // === PREVIEW HAPPY SABBATH INVITATION ===
  async previewHappySabbath() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // ✅ Fetch latest invitation from Firestore
    const invitations = await firstValueFrom(this.invitations$);
    const latest = invitations[invitations.length - 1] || {};

    // Logo
    const logo = '/adventist_blue_logo.png';
    try {
      doc.addImage(logo, 'PNG', pageWidth - 50, 10, 30, 30);
    } catch {
      console.warn('Logo not found');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(0, 102, 204);
    doc.text('Happy Sabbath Invitation', pageWidth / 2, 40, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(50);

    let yPos = 70;
    doc.text(`Church Name: ${latest.churchName || ''}`, 20, yPos);
    doc.text(`Location: ${latest.location || ''}`, 20, (yPos += 10));
    doc.text(`Date: ${latest.date || ''}`, 20, (yPos += 10));
    doc.text(`Time: ${latest.time || ''}`, 20, (yPos += 10));

    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
  }

// === PREVIEW SABBATH SCHOOL SERVICE ===
  async previewSabbathService() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.text('Sabbath School Service Preview', pageWidth / 2, 20, { align: 'center' });

    // ✅ Fetch from Firestore
    const sabbathData = await firstValueFrom(this.sabbathServices$);
    const data = sabbathData[sabbathData.length - 1] || {};

    const fields = Object.keys(data);
    let yPos = 40;

    doc.setFont('times', 'normal');
    doc.setFontSize(12);

    fields.forEach(field => {
      const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      doc.text(`${label}: ${data[field] || ''}`, 20, yPos);
      yPos += 10;
    });

    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
  }

// === PREVIEW DIVINE SERVICE ===
  async previewDivineService() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.text('Divine Service Preview', pageWidth / 2, 20, { align: 'center' });

    // ✅ Fetch from Firestore
    const divineData = await firstValueFrom(this.divineServices$);
    const data = divineData[divineData.length - 1] || {};

    const fields = Object.keys(data);
    let yPos = 40;

    doc.setFont('times', 'normal');
    doc.setFontSize(12);

    fields.forEach(field => {
      const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      doc.text(`${label}: ${data[field] || ''}`, 20, yPos);
      yPos += 10;
    });

    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
  }

  panelExpanded = {
    cover: false,
    happySabbath: false,
    sabbath: false,
    divine: false,
    song1: false,
    song2: false
  };


  addSabbathSongService(){

  }

  generateCombinedSongPDF(){

  }

  addSabbathSchoolOpeningSong(){

  }

  addSabbathSchoolClosingSong(){

  }

  addSabbathSchoolAnnouncements(){

  }


  addDivineSongService(){

  }


  addDivinePreludeSong(){

  }


  addDivineOpeningSong(){

  }

  addResponseSong(){

  }

  addDivineClosingSong(){

  }


}
