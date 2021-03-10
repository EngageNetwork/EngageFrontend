import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { SlateService } from '@app/_services';

@Component({ templateUrl: './list.component.html' })

export class ListComponent implements OnInit {
  sessions: any[];

  constructor(
    private snackBar: MatSnackBar,
    private slateService: SlateService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('My Sessions');

    this.slateService.getMySessions()
      .pipe(first())
      .subscribe(sessions => this.sessions = sessions);
  }

  cancelSession(id: string) {
    const session = this.sessions.find(x => x.id === id);
    if (confirm(`Cancel session?`)) {
      session.isRemoving = true;
      this.slateService.cancel(id)
        .pipe(first())
        .subscribe({
          next: () => {
            // Display success message to user
            this.snackBar.open('Session cancelled successfully', 'Close', { duration: 10000 });
            this.sessions = this.sessions.filter(x => x.id !== id);
          },
          error: error => {
            // Display error to user
            this.snackBar.open(error, 'Close', { duration: 10000 });
            session.isRemoving = false;
          }
        })
    }
  }
}
