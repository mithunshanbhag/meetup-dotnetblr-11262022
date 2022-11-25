import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback.component';
import { Constants } from './constants';
import { LandingPageComponent } from './landing-page.component';
import { LogoutComponent } from './logout.component';

const routes: Routes = [
  { path: 'authcallback', component: AuthCallbackComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: LandingPageComponent, canActivate: [MsalGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    LandingPageComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // per angular docs, HttpClientModule must be imported after BrowserModule
    MsalModule.forRoot(
      new PublicClientApplication({ // MSAL Configuration
        auth: {
          clientId: Constants.clientId,
          redirectUri: Constants.redirectUri,
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: false, // set to true for IE 11
        },
        system: {
          loggerOptions: {
            loggerCallback: () => { },
            piiLoggingEnabled: false
          }
        }
      }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        [
          `${Constants.apiEndpointUri}/items/*`, [
            `api://${Constants.clientId}/Items.Read`
          ]
        ]
      ])
    }),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
