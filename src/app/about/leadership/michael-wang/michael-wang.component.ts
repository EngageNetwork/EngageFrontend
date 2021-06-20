import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	templateUrl: './michael-wang.component.html',
	styleUrls: ['./michael-wang.component.scss']
})
export class MichaelWangComponent implements OnInit {
	
	constructor(private title: Title) { }
	
	ngOnInit() {
		this.title.setTitle('Michael Wang | Engage Leadership');
	}
}
