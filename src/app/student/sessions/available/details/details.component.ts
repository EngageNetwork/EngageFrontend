import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { SlateService } from '@app/_services';

@Component({ templateUrl: './details.component.html' })

export class DetailsComponent implements OnInit {
	id: string;
	listing: any;
	
	constructor(
		private slateService: SlateService,
		private route: ActivatedRoute,
		private title: Title
		) { }
		
		ngOnInit(): void {
			this.title.setTitle('Listing Details');
			
			this.id = this.route.snapshot.params['id'];
			
			this.slateService.getListingById(this.id)
			.pipe(first())
			.subscribe(x => this.listing = x);
		}
		
	}
	