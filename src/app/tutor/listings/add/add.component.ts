import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SlateService } from '@app/_services';

@Component({ templateUrl: './add.component.html' })

export class AddComponent implements OnInit {
	createListingForm: FormGroup;
	loading = false;
	submitted = false;
	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit() {
		this.title.setTitle('Create Listing | Engage Network');
		
		this.createListingForm = this.formBuilder.group({
			subject: ['', Validators.required],
			details: [''],
			startDateTime: ['', Validators.required],
			endDateTime: ['', Validators.required]
		});
	}
	
	// Get form fields easily in code below and to call from angular template
	get f() { return this.createListingForm.controls; }
	
	onSubmit() {
		this.submitted = true;

		// Stop code if form has anything invalid
		if (this.createListingForm.invalid) {
			return;
		}

		// Ensure time range is specified
		if (!this.createListingForm.value.startDateTime || !this.createListingForm.value.endDateTime) {
			this.snackBar.open('Specify Time Range', 'Close', { duration: 10000 });
			return;
		}

		// Ensure time range starts after current time
		var currentDateTime = new Date();
		if (this.createListingForm.value.startDateTime < currentDateTime) {
			this.snackBar.open('Check Start Time', 'Close', { duration: 10000 });
			return;
		}

		// Ensure time range is in correct oder
		if (this.createListingForm.value.startDateTime > this.createListingForm.value.endDateTime) {
			this.snackBar.open('Check Time Range', 'Close', { duration: 10000 });
			return;
		}
		
		// Check for specific language if subject is FLA
		if (this.createListingForm.value.subject == 'Foreign Language Acquisition') {
			if (!this.createListingForm.value.details) {
				this.snackBar.open('Specify Language', 'Close', { duration: 10000 });
				return;
			}
		}

		// If subject is not set to FLA, clear details
		if (this.createListingForm.value.subject != 'Foreign Language Acquisition') {
			this.createListingForm.value.details = null;
		}
		
		// Access API to send listing creation request
		this.loading = true;
		this.slateService.create(this.createListingForm.value)
		.pipe(first())
		.subscribe({
			next: () => {
				// Display success message to admin and redirects to listing overview page
				this.snackBar.open('Listing created successfully', 'Close', { duration: 10000 });
				this.router.navigate(['../'], { relativeTo: this.route });
			},
			error: error => {
				// Display error to user
				this.snackBar.open(error, 'Close', { duration: 10000 });
				this.loading = false;
			}
		});
	}
}
