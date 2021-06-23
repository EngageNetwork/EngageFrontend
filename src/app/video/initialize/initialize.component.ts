import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { VideoConferenceService } from '@app/_services';

const videoUrl = environment.videoUrl;

@Component({
	selector: 'app-initialize',
	templateUrl: './initialize.component.html',
	styleUrls: ['./initialize.component.scss']
})
export class InitializeComponent implements OnInit {
	id: string;
	interval: any;
	periods: string = '.';

	constructor(
		private route: ActivatedRoute,
		private videoConferenceService: VideoConferenceService
	) { }
	
	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];

		this.interval = setInterval(() => {
			this.setPeriods();
		}, 550);

		this.videoConferenceService.initiateRoom(this.id)
		.pipe(first())
		.subscribe(sessionDetails => {
			location.href = `${videoUrl}/room/${sessionDetails.latestVideoConferenceRoom.sid}`;
		});
	}

	ngOnDestroy(): void {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
	
	setPeriods() {
		if (this.periods.length < 3) {
			this.periods += '.';
		}
		else {
			this.periods = '.';
		}
	}
}
