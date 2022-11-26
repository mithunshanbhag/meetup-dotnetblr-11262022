import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable, of } from 'rxjs';
import { Constants } from './constants';

@Component({
  selector: 'app-landing-page',
  template: `
    <div style="text-align:center">
    <h1>{{title}}</h1>
    <p><b>User:</b> {{userName$ | async}}</p>
    <p><b>API Response:</b> {{apiResponse$ | async}}</p>
    </div>
  `,
  styles: []
})
export class LandingPageComponent implements OnInit {

  title = 'oauth2 flow (landing page)';

  apiResponse$: Observable<any> = new Observable<any>();

  userName$: Observable<string> = new Observable<string>();

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
      this.userName$ = of(account.name) as Observable<string>;
      console.log(`name: ${account.name}`);
      console.log(`username: ${account.username}`);
      console.log(`tenantId: ${account.tenantId}`);
    });

    // call items API
    this.httpClient.get(`${Constants.apiEndpointUri}/items/1`, { responseType: 'text' })
      .subscribe(result => {
        this.apiResponse$ = of(result);
        console.log(`api response: ${result}`);
      });
  }
}