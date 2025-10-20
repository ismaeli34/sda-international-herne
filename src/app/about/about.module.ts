// about.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurPastorComponent } from './our-pastor/our-pastor.component';
import { FaithStatementComponent } from './faith-statement/faith-statement.component';
import { HistoryComponent } from './history/history.component';
import { ChurchStaffComponent } from './church-staff/church-staff.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PurposeAndMissionComponent } from './purpose-and-mission/purpose-and-mission.component';
import { AddPhotosComponent } from './add-photos/add-photos.component';
import { AuthGuard } from '../auth.guard';
import {SabbathSnapshotsComponent} from './sabbath-snapshots/sabbath-snapshots.component';
import {AddChurchStaffComponent} from './add-church-staff/add-church-staff.component';

const routes = [
  { path:'', component: AboutComponent, children:[
      { path: 'about-us', component: AboutUsComponent },
      { path: 'our-pastor', component: OurPastorComponent },
      { path: 'faith-statement', component: FaithStatementComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'church-staff', component: ChurchStaffComponent },
      { path: 'add-church-staff', component: AddChurchStaffComponent, canActivate: [AuthGuard] },
      { path: 'gallery', component: GalleryComponent },
      { path: 'sabbath-snapshots', component: SabbathSnapshotsComponent },
      { path: 'add-photos', component: AddPhotosComponent, canActivate: [AuthGuard] },
      { path: 'purpose-and-mission', component: PurposeAndMissionComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutModule {}
