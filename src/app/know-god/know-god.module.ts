import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowGodRoutingModule } from './know-god-routing.module';
import {WhoIsJesusComponent} from './who-is-jesus/who-is-jesus.component';
import {WhyINeedJesusComponent} from './why-i-need-jesus/why-i-need-jesus.component';
import {NextStepsComponent} from './next-steps/next-steps.component';
import {ReceiveJesusComponent} from './receive-jesus/receive-jesus.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KnowGodRoutingModule,
    WhoIsJesusComponent,
    WhyINeedJesusComponent,
    NextStepsComponent,
    ReceiveJesusComponent
  ]
})
export class KnowGodModule { }
