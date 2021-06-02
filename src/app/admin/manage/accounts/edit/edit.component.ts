import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: './edit.component.html' })

export class EditComponent implements OnInit {
	updateAccountForm: FormGroup;
	id: string;
	loading = false;
	submitted = false;
	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		private title: Title
	) { }
	
	ngOnInit() {
		this.title.setTitle('Update User | Admin');
		
		this.id = this.route.snapshot.params['id'];
		
		this.updateAccountForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			role: ['', Validators.required],
			password: ['', [Validators.nullValidator, Validators.minLength(6)]],
			confirmPassword: ['']
		}, {
			validator: MustMatch('password', 'confirmPassword')
		});
		
		this.accountService.getById(this.id)
		.pipe(first())
		.subscribe(x => this.updateAccountForm.patchValue(x));
	}
	
	// Get form fields easily in code below and to call from angular template
	get f() { return this.updateAccountForm.controls; }
	
	onSubmit() {
		this.submitted = true;
		
		// Stop code if form has anything invalid
		if (this.updateAccountForm.invalid) {
			return;
		}
		
		// Access API to send update request
		this.loading = true;
		this.accountService.update(this.id, this.updateAccountForm.value)
		.pipe(first())
		.subscribe({
			next: () => {
				// Display success message to admin and redirects to accounts list page
				this.snackBar.open('Account details updated successfully', 'Close', { duration: 10000 });
				this.router.navigate(['../../'], { relativeTo: this.route });
			},
			error: error => {
				// Display error to administrator
				this.snackBar.open(error, 'Close', { duration: 10000 });
				this.loading = false;
			}
		});
	}
}
