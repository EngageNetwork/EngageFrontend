import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
	
	constructor(private title: Title) { }
	
	ngOnInit() {
		this.title.setTitle('About Us | Engage Network');
	}
	
}
