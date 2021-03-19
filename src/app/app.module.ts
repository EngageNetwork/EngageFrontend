import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccountService } from './_services';

import { GlobalHomeComponent } from './global-home/global-home.component';
import { AboutComponent } from './about/about.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';

@NgModule({
	declarations: [
		AppComponent,
		GlobalHomeComponent,
		AboutComponent,
		ViewprofileComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatSnackBarModule,
		NgbModule,
		BrowserAnimationsModule
	],
	providers: [
		{ provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
