import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectComponent} from './connect.component';
import {ConnectUsComponent} from './connect-us/connect-us.component';
import {BibleStudiesComponent} from './bible-studies/bible-studies.component';
import {MinistriesComponent} from './ministries/ministries.component';
import {PrayerMeetingsComponent} from './prayer-meetings/prayer-meetings.component';
import {ServiceTeamsComponent} from './service-teams/service-teams.component';
import {ChurchDateInformationComponent} from './church-date-information/church-date-information.component';
import {AddChurchMemberComponent} from './add-church-member/add-church-member.component';
import {ChurchMemberListComponent} from './church-member-list/church-member-list.component';

const routes: Routes = [
  {
    path:'',
    component: ConnectComponent,
    children:[
      {path:'', component: ConnectUsComponent},
      {path:'bible-studies', component: BibleStudiesComponent},
      {path:'ministries',component: MinistriesComponent},
      {path:'prayer-meetings',component: PrayerMeetingsComponent},
      {path:'service-teams',component: ServiceTeamsComponent},
      {path:'church-info',component:ChurchDateInformationComponent},
      {path:'add-church-member',component:AddChurchMemberComponent},
      {path:'church-member-list', component:ChurchMemberListComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectRoutingModule { }
