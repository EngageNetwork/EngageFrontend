import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SlateService } from '@app/_services';

@Component({ templateUrl: './edit.component.html' })

export class EditComponent implements OnInit {
	updateListingForm: FormGroup;
	id: string;
	loading = false;
	submitted = false;
	selectedSubjectFLA = false;
	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
		) { }
		
		ngOnInit() {
			this.title.setTitle('Update Listing | Engage Network');
			
			this.id = this.route.snapshot.params['id'];
			
			this.updateListingForm = this.formBuilder.group({
				subject: ['', Validators.required],
				details: [''],
				startDateTime: ['', Validators.required],
				endDateTime: ['', Validators.required]
			});
			
			this.slateService.getListingById(this.id)
			.pipe(first())
			.subscribe(x => this.updateListingForm.patchValue({
				subject: x.subject,
				details: x.details
			}));
		}
		
		// Get form fields easily in code below and to call from angular template
		get f() { return this.updateListingForm.controls; }
		
		onSubmit() {
			this.submitted = true;
			
			// Stop code if form has anything invalid
			if (this.updateListingForm.invalid) {
				return;
			}
			
			// Ensure time range is specified
			if (!this.updateListingForm.value.startDateTime || !this.updateListingForm.value.endDateTime) {
				this.snackBar.open('Specify Time Range', 'Close', { duration: 10000 });
				return;
			}

			// Check for specific language if subject is FLA
			if (this.updateListingForm.value.subject == 'Foreign Language Acquisition') {
				if (!this.updateListingForm.value.details) {
					this.snackBar.open('Specify Language', 'Close', { duration: 10000 });
					return;
				}
			}

			// If subject is not set to FLA, clear details
			if (this.updateListingForm.value.subject != 'Foreign Language Acquisition') {
				this.updateListingForm.value.details = null;
			}

			// Access API to update edit
			this.loading = true;
			this.slateService.update(this.id, this.updateListingForm.value)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user and redirect to listings page
					this.snackBar.open('Listing details updated successfully', 'Close', { duration: 10000 });
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				error: error => {
					// Display error to administrator
					this.snackBar.open(error, 'Close', { duration:10000 });
					this.loading = false;
				}
			});
		}
		
	}
	