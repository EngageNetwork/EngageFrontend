import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ OverviewComponent, AddComponent, EditComponent ] ,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountsRoutingModule
  ]
})

export class AccountsModule { }
