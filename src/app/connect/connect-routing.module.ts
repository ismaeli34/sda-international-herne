import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectComponent} from './connect.component';
import {ConnectUsComponent} from './connect-us/connect-us.component';
import {BibleStudiesComponent} from './bible-studies/bible-studies.component';
import {MinistriesComponent} from './ministries/ministries.component';
import {PrayerMeetingsComponent} from './prayer-meetings/prayer-meetings.component';
import {ServiceTeamsComponent} from './service-teams/service-teams.component';

const routes: Routes = [
  {
    path:'',
    component: ConnectComponent,
    children:[
      {path:'', component: ConnectUsComponent},
      {path:'bible-studies', component: BibleStudiesComponent},
      {path:'ministries',component: MinistriesComponent},
      {path:'prayer-meetings',component: PrayerMeetingsComponent},
      {path:'service-teams',component: ServiceTeamsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectRoutingModule { }
