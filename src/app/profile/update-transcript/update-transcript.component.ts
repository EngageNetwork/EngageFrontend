import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';

@Component({
	templateUrl: './update-transcript.component.html',
	styleUrls: ['./update-transcript.component.scss']
})

export class UpdateTranscriptComponent implements OnInit {
	updateTranscriptForm: FormGroup;
	account = this.accountService.accountValue;
	transcript = [];

	loading = false;
	submitted = false;
	deleting = false;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		private title: Title
	) { }
	
	ngOnInit() {
		this.title.setTitle('Update Transcript');

		this.updateTranscriptForm = this.formBuilder.group({
			math: [''],
			science: [''],
			socialStudies: [''],
			languageArts: [''],
			foreignLanguageAcquisition: ['']
		});

		this.accountService.getById(this.account.id)
		.pipe(first())
		.subscribe(x => this.updateTranscriptForm.patchValue(x.transcript));
	}

	// Get form fields easily in code below and to call from angular template
	get f() { return this.updateTranscriptForm.controls; }

	onSubmit() {
		this.submitted = true;

		// Stop code if form has anything invalid
		if (this.updateTranscriptForm.invalid) {
			return;
		}

		// Access API to send transcript update request
		this.loading = true;
		this.accountService.updateTranscript(this.updateTranscriptForm.value)
		.pipe(first())
		.subscribe({
			next: () => {
				// Display success message to admin and redirects to accounts list page
				this.snackBar.open('Transcript updated successfully', 'Close', { duration: 10000 });
				this.router.navigate(['../'], { relativeTo: this.route });
			},
			error: error => {
				// Display error to administrator
				this.snackBar.open(error, 'Close', { duration: 10000 });
				this.loading = false;
			}
		});
	}
}
