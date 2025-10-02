import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectRoutingModule } from './connect-routing.module';
import {ConnectComponent} from './connect.component';
import {ConnectUsComponent} from './connect-us/connect-us.component';
import {BibleStudiesComponent} from './bible-studies/bible-studies.component';
import {MinistriesComponent} from './ministries/ministries.component';
import {PrayerMeetingsComponent} from './prayer-meetings/prayer-meetings.component';
import {ServiceTeamsComponent} from './service-teams/service-teams.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConnectRoutingModule,
    ConnectComponent,
    ConnectUsComponent,
    BibleStudiesComponent,
    MinistriesComponent,
    PrayerMeetingsComponent,
    ServiceTeamsComponent
  ]
})
export class ConnectModule { }
