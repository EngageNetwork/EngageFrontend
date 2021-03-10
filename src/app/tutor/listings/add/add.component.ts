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
			this.title.setTitle('Creating New Listing');
			
			this.createListingForm = this.formBuilder.group({
				date: ['', Validators.required],
				subject: ['', Validators.required],
				startTime: ['', Validators.required],
				endTime: ['', Validators.required]
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
			})
		}
	}
