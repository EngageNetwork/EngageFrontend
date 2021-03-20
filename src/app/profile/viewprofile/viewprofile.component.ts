import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({
	selector: 'app-viewprofile',
	templateUrl: './viewprofile.component.html',
	styleUrls: ['./viewprofile.component.scss']
})
export class ViewProfileComponent implements OnInit {
	id: string;
	account: any;
	Role = Role;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private accountService: AccountService,
		private title: Title,
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('View Profile')

		this.id = this.route.snapshot.params['id'];

		this.accountService.getByIdPublic(this.id)
		.pipe(first())
		.subscribe(account => this.account = account);
	}
	
}
