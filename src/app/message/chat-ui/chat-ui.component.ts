import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import Feather from 'feather-icons';
import { Role } from '@app/_models';

import { AccountService, MessageService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
	templateUrl: './chat-ui.component.html',
	styleUrls: ['./chat-ui.component.scss']
})

export class ChatUIComponent implements OnInit, AfterViewInit {
	interval: any;
	account: Account;
	id: string;
	chatId: string;
	messages: any;
	otherUserName: string;
	msgPayload: string;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		private messageService: MessageService,
		private title: Title
	) {
		this.accountService.account.subscribe(a => this.account = a);
	}
	
	ngOnInit(): void {
		this.title.setTitle('Chat');
		
		this.id = this.route.snapshot.params['id'];
		
		// Check for if user is chatting with self
		if (this.account.id === this.id) {
			const role = this.accountService.accountValue.role;
			if (role == Role.Admin) {
				this.router.navigate(['/admin/home']);
			} else if (role == Role.Tutor) {
				this.router.navigate(['/tutor/home']);
			} else if (role == Role.Student) {
				this.router.navigate(['/student/home']);
			}
		}

		this.accountService.getByIdPublic(this.id)
		.pipe(first())
		.subscribe({
			next: accountDetails => {
				this.otherUserName = [accountDetails.firstName, accountDetails.lastName].join(' ');
			},
			error: error => {
				// Display error to user
				this.snackBar.open(error, 'Close', { duration: 10000 });
			}
		});
		
		this.messageService.initiateChat({ userIds: [this.id] })
		.pipe(first())
		.subscribe({
			next: chat => {
				this.chatId = chat.id
				this.getConversation(this.chatId);
				this.interval = setInterval(() => {
					this.getConversation(this.chatId);
				}, 1000);
			},
			error: error => {
				// Display error to user
				this.snackBar.open(error, 'Close', { duration: 10000 });
			}
		});
	}
	
	ngAfterViewInit(): void {
		Feather.replace();
	}

	ngOnDestroy(): void {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	getConversation(chatId) {
		this.messageService.getConversationByChatId(chatId)
		.pipe(first())
		.subscribe({
			next: conversations => {
				conversations.conversation.forEach(function(item) {
					item.createdAt = moment(item.createdAt).format('LT MMMM Do[,] YYYY');
				})
				this.messages = conversations.conversation;
			},
			error: error => {
				// Display error to user
				this.snackBar.open(error, 'Close', { duration: 10000 });
			}
		});
	}

	sendMessage() {
		if (!this.msgPayload || !this.msgPayload.trim()) {
			// Display error to user
			this.snackBar.open('Message cannot be empty', 'Close', { duration: 10000 });
			return;
		}

		this.messageService.postMsg(this.chatId, this.msgPayload)
		.pipe(first())
		.subscribe({
			next: response => {
				console.log(response);
				this.msgPayload = '';
				
			},
			error: error => {
				// Display error to user
				this.snackBar.open(error, 'Close', { duration: 10000 });
			}
		})
	}
	
	triggerFunction(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			this.sendMessage();
		}
	}
}
