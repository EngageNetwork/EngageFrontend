import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountsRoutingModule
  ]
})

export class AccountsModule { }
