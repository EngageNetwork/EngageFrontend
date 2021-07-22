import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Chat, Message } from '@app/_models';

const baseUrl = `${environment.apiUrl}/message`;

@Injectable({ providedIn: 'root' })

export class MessageService {
	private chatSubject: BehaviorSubject<Chat>;
	private chat: Observable<Chat>;
	private messageSubject: BehaviorSubject<Message>;
	private message: Observable<Message>;
	
	constructor(
		private router: Router,
		private http: HttpClient
	) {
		this.chatSubject = new BehaviorSubject<Chat>(null);
		this.chat = this.chatSubject.asObservable();
		this.messageSubject = new BehaviorSubject<Message>(null);
		this.message = this.messageSubject.asObservable();
	}
	
	initiateChat(userIds) {
		return this.http.post<Chat>(`${baseUrl}/initiate`, userIds);
	}
	
	postMsg(id: string, msgPayload) {
		return this.http.post<any>(`${baseUrl}/${id}/message`, { msgPayload });
	}

	getContacts() {
		return this.http.get(`${baseUrl}/contacts`);
	}
	
	getConversationByChatId(id: string) {
		return this.http.get<Message>(`${baseUrl}/${id}`);
	}
}
