import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import * as Feather from 'feather-icons';

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
	
	ngOnInit() {
		this.title.setTitle('Chat');
		
		this.id = this.route.snapshot.params['id'];
		
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
	
	ngAfterViewInit() {
		Feather.replace();
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
		this.messageService.postMsg(this.chatId, { messageText: this.msgPayload })
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
		if (event.ctrlKey && event.key === 'Enter') {
			this.msgPayload += '\n';
		} else if (event.key === 'Enter') {
			event.preventDefault();
			this.sendMessage();
		}
	}
}
