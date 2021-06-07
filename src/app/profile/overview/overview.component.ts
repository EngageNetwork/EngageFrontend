import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})

export class OverviewComponent {
	account = this.accountService.accountValue;
	totalDays: number;
	totalHours: number;
	totalMinutes: number;
	totalSeconds: number;
	fractionalHours: number;
	
	Role = Role;

	constructor(
		private accountService: AccountService,
		private title: Title
	) { }
	
	ngOnInit() {
		this.title.setTitle('Profile Overview');

		this.getTotalDHMS(this.account.totalDuration);

		console.log(this.account);
	}

	getTotalDHMS(seconds) {
		// Get Total Days, Hours, Minutes, and Seconds
		this.totalDays = Math.floor(seconds / (24*60*60));
      	seconds -= this.totalDays * (24*60*60);
  		this.totalHours = Math.floor(seconds / (60*60));
      	seconds -= this.totalHours * (60*60);
  		this.totalMinutes = Math.floor(seconds / (60));
    	seconds -= this.totalMinutes * (60);
		this.totalSeconds = seconds;

		// Get Fractional Hour
		this.fractionalHours = Math.round(((this.totalMinutes/60) + Number.EPSILON) * 100) / 100;
	}
}
	