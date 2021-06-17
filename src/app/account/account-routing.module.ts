import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdGuard } from '@app/_helpers';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent, canActivate: [ProdGuard] },
			{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ProdGuard] },
			{ path: 'reset-password', component: ResetPasswordComponent, canActivate: [ProdGuard] },
			{ path: 'verify-email', component: VerifyEmailComponent, canActivate: [ProdGuard] }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class AccountRoutingModule { }
