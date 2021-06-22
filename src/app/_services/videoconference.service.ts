import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/slate/video`;

interface AuthDetails {
	sid: string,
	token: string;
}

@Injectable({ providedIn: 'root' })

export class VideoConferenceService {
	constructor(
		private http: HttpClient
	) {	}
	
	initiateRoom(sessionId: string) {
		return this.http.post<any>(`${baseUrl}/initiate/${sessionId}`, null);
	}
	
	getToken(sessionId: string) {
		return this.http.get<AuthDetails>(`${baseUrl}/token/${sessionId}`);
	}
}
