import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	templateUrl: './gerry-chen.component.html',
	styleUrls: ['./gerry-chen.component.scss']
})
export class GerryChenComponent implements OnInit {
	
	constructor(private title: Title) { }
	
	ngOnInit() {
		this.title.setTitle('Gerry Chen | Engage Leadership');
	}
}
