import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Slate } from '@app/_models';

const baseUrl = `${environment.apiUrl}/slate`;

@Injectable({ providedIn: 'root' })

export class SlateService {
	private slateSubject: BehaviorSubject<Slate>;
	private slate: Observable<Slate>;
	
	constructor(
		private router: Router,
		private http: HttpClient
	) {
		this.slateSubject = new BehaviorSubject<Slate>(null);
		this.slate = this.slateSubject.asObservable();
	}
	
	create(slate: Slate) {
		return this.http.post(`${baseUrl}/create`, slate);
	}
	
	register(id: string) {
		return this.http.post(`${baseUrl}/register/${id}`, null);
	}
	
	cancel(id: string) {
		return this.http.post(`${baseUrl}/cancel/${id}`, null);
	}
	
	getAllSlates() {
		return this.http.get<Slate[]>(`${baseUrl}`);
	}

	getSlateById(id: string) {
		return this.http.get<Slate>(`${baseUrl}/slate/${id}`);
	}

	getAllListings() {
		return this.http.get<Slate[]>(`${baseUrl}/listings`);
	}
	
	getMyListings() {
		return this.http.get<Slate[]>(`${baseUrl}/mylistings`);
	}

	getMyFinishedListings() {
		return this.http.get<Slate[]>(`${baseUrl}/myfinishedlistings`);
	}
	
	getListingById(id: string) {
		return this.http.get<Slate>(`${baseUrl}/listing/${id}`);
	}
	
	getMySessions() {
		return this.http.get<Slate[]>(`${baseUrl}/mysessions`);
	}

	getMyFinishedSessions() {
		return this.http.get<Slate[]>(`${baseUrl}/myfinishedsessions`);
	}
	
	getSessionById(id: string) {
		return this.http.get<Slate>(`${baseUrl}/session/${id}`);
	}
	
	update(id: string, slate: Slate) {
		return this.http.put(`${baseUrl}/update/${id}`, slate);
	}

	markComplete(id: string) {
		return this.http.put(`${baseUrl}/markcomplete/${id}`, null);
	}

	submitContentRating(id: string, contentRating) {
		return this.http.put(`${baseUrl}/rating/content/${id}`, contentRating);
	}

	submitBehaviourRating(id: string, behaviourRating) {
		return this.http.put(`${baseUrl}/rating/behaviour/${id}`, behaviourRating);
	}
	
	delete(id: string) {
		return this.http.delete(`${baseUrl}/delete/${id}`);
	}
}