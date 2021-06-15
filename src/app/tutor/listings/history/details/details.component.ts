import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
	id: string;
	listing: any;
	behaviourRatingValue: number;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Session Details | Engage Network');
		
		this.id = this.route.snapshot.params['id'];
		
		this.slateService.getListingById(this.id)
		.pipe(first())
		.subscribe(listing => {
			listing.startDateTime = moment(listing.startDateTime).format('LT MMMM Do[,] YYYY');
			listing.endDateTime = moment(listing.endDateTime).format('LT MMMM Do[,] YYYY');
			listing.updatedAt = moment(listing.updatedAt).format('LT MMMM Do[,] YYYY');
			
			this.listing = listing;
		});
	}

	markCompleted() {
		const listing = this.listing;
		if (!listing.markedCompletedTutor) {
			if (confirm(`Mark session with ${listing.registeredDetails.firstName} ${listing.registeredDetails.lastName} as complete?`)) {
				listing.isMarkingComplete = true;
				this.slateService.markComplete(this.id)
				.pipe(first())
				.subscribe({
					next: () => {
						// Display success message to user
						this.snackBar.open('Session marked as complete successfully', 'Close', { duration: 10000 });
						this.router.navigate(['../../'], { relativeTo: this.route });
					},
					error: error => {
						// Display error to user
						this.snackBar.open(error, 'Close', { duration: 10000 });
						listing.isMarkingComplete = false;
					}
				})
			}
		}
		if (!!listing.markedCompletedTutor) {
			if (confirm(`Unmark session with ${listing.registeredDetails.firstName} ${listing.registeredDetails.lastName} as complete?`)) {
				listing.isMarkingComplete = true;
				this.slateService.markComplete(this.id)
				.pipe(first())
				.subscribe({
					next: () => {
						// Display success message to user
						this.snackBar.open('Session unmarked as complete', 'Close', { duration: 10000 });
						this.router.navigate(['../../'], { relativeTo: this.route });
					},
					error: error => {
						// Display error to user
						this.snackBar.open(error, 'Close', { duration: 10000 });
						listing.isMarkingComplete = false;
					}
				})
			}
		}
	}

	updateBehaviourRatingValue(event: any) {
		this.behaviourRatingValue = event.value;
	}

	submitRatings() {
		const listing = this.listing;

		if (!this.behaviourRatingValue) {
			// Display error to user
			this.snackBar.open('No behaviour rating provided', 'Close', { duration: 10000 });
			return;
		}
		if (confirm(`Submit behaviour rating for ${listing.registeredDetails.firstName} ${listing.registeredDetails.lastName}?`)) {
			listing.isSubmitting = true;
			
			this.slateService.submitBehaviourRating(this.id, { behaviourRating: this.behaviourRatingValue })
			.pipe(first())
			.subscribe({
				next: () =>  {
					// Display success message to user
					this.snackBar.open('Behaviour rating submitted successfully', 'Close', { duration: 10000 });
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					listing.isSubmitting = false;
				}
			});
		}
	}

	deleteListing(id: string) {
		const listing = this.listing;
		if (confirm(`Are you sure you want to delete this listing? This action cannot be reversed.`)) {
			listing.isDeleting = true;
			this.slateService.delete(id)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open('Listing deleted successfully', 'Close', { duration: 10000 });
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					listing.isDeleting = false;
				}
			});
		}
	}
}
	