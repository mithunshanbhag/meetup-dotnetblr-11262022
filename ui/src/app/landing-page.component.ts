import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { Constants } from './constants';

@Component({
  selector: 'app-landing-page',
  template: `
    <div style="text-align:center">
    <h1>{{title}}</h1>
    <p>welcome {{userName$ | async}}</p>
    <img src="{{ userPic$ | async}}"/>
    </div>
  `,
  styles: []
})
export class LandingPageComponent implements OnInit {

  title = 'demo: implicit flow (landing page)';

  userName$: Observable<string> = new Observable<string>();
  userPic$: Observable<string> = new Observable<string>();

  constructor(
    private msalService: MsalService,
    private httpClient: HttpClient,
  ) {
    console.log('In LandingPageComponent::ctor');
  }

  ngOnInit(): void {
    console.log('In LandingPageComponent::ngOnInit');

    // dump user info to console
    this.msalService.instance.getAllAccounts().forEach(account => {
      console.log(`name: ${account.name}`);
      console.log(`username: ${account.username}`);
      console.log(`tenantId: ${account.tenantId}`);
    });

    this.httpClient.get<string>(`${Constants.apiEndpointUri}/items/3`).subscribe();

    this.httpClient.post<string>(`${Constants.apiEndpointUri}/items/3`, null).subscribe();
  }
}