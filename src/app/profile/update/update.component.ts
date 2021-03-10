import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: './update.component.html' })

export class UpdateComponent implements OnInit {
	updateAccountForm: FormGroup;
	account = this.accountService.accountValue;
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
			this.title.setTitle('Update Profile');
			
			this.updateAccountForm = this.formBuilder.group({
				firstName: ['', Validators.required],
				lastName: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.nullValidator, Validators.minLength(6)]],
				confirmPassword: ['']
			}, {
				validator: MustMatch('password', 'confirmPassword')
			});
			
			this.accountService.getById(this.account.id)
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
			
			// Access API to send registration request
			this.loading = true;
			this.accountService.update(this.account.id, this.updateAccountForm.value)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to admin and redirects to accounts list page
					this.snackBar.open('Account details updated successfully', 'Close', { duration: 10000 });
					this.router.navigate(['../'], { relativeTo: this.route });
				},
				error: error => {
					// Display error to administrator
					this.snackBar.open(error, 'Close', { duration: 10000 });
					this.loading = false;
				}
			});
		}
		
		onDelete() {
			if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
				this.deleting = true;
				this.accountService.delete(this.account.id)
				.pipe(first())
				.subscribe(() => {
					this.snackBar.open('Account deleted successfully', 'Close', { duration: 10000 });
				});
			}
		}
	}
