import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService, private title: Title) { }

    ngOnInit() {
      this.title.setTitle('Engage Network');
    }
}
