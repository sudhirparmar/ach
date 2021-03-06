import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
//import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { Globals } from './globals';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordService } from './services/change-password.service';


import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';


import { AchComponent } from './ach/ach.component';
import { AchService } from './services/ach.service';

import { AchListComponent } from './ach-list/ach-list.component';

import { ThankYouComponent } from './thank-you/thank-you.component';

import { AchInvitationComponent } from './ach-invitation/ach-invitation.component';
import { AchInvitationListComponent } from './ach-invitation-list/ach-invitation-list.component';
import { AchInvitationService } from './services/ach-invitation.service';

import { LoginLogComponent } from './login-log/login-log.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { EmailLogComponent } from './email-log/email-log.component';
import { AuditLogService } from './services/audit-log.service';

import { CountryComponent } from './country/country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryService } from './services/country.service';


import { StateComponent } from './state/state.component';
import { StateListComponent } from './state-list/state-list.component';
import { StateService } from './services/state.service';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotResetService } from './services/forgot-reset.service';





@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

    ChangePasswordComponent,

    AchComponent,
    AchListComponent,
    ThankYouComponent,

    AchInvitationComponent,
    AchInvitationListComponent,

    LoginLogComponent,
    ActivityLogComponent,
    EmailLogComponent,

    CountryComponent,
    CountryListComponent,

    StateComponent,
    StateListComponent,

    ForgotPasswordComponent,
    ResetPasswordComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },

      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },

      { path: 'ach/:id', component: AchComponent, canActivate: [AuthGuard] },
      { path: 'thank-you', component: ThankYouComponent, canActivate: [AuthGuard] },

      { path: 'ach-list', component: AchListComponent, canActivate: [AuthGuard] },
      { path: 'ach-invitation', component: AchInvitationComponent, canActivate: [AuthGuard] },
      { path: 'ach-invitation/list', component: AchInvitationListComponent, canActivate: [AuthGuard] },

      { path: 'login-log', component: LoginLogComponent, canActivate: [AuthGuard] },
      { path: 'activity-log', component: ActivityLogComponent, canActivate: [AuthGuard] },
      { path: 'email-log', component: EmailLogComponent, canActivate: [AuthGuard] },

      { path: 'country/add', component: CountryComponent, canActivate: [AuthGuard] },
      { path: 'country/edit/:id', component: CountryComponent, canActivate: [AuthGuard] },
      { path: 'country/list', component: CountryListComponent, canActivate: [AuthGuard] },

      { path: 'state/add', component: StateComponent, canActivate: [AuthGuard] },
      { path: 'state/edit/:id', component: StateComponent, canActivate: [AuthGuard] },
      { path: 'state/list', component: StateListComponent, canActivate: [AuthGuard] },

      { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
      { path: 'reset-password/:id', component: ResetPasswordComponent, canActivate: [AuthGuard] },

   

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }

    ])
  ],
  providers: [Globals, AuthGuard, AuthService, AchService, AchInvitationService, AuditLogService, ChangePasswordService, CountryService, StateService, ForgotResetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
