import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

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
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
  ) {
    console.log('In LandingPageComponent::ctor');
  }

  ngOnInit(): void {
    console.log('In LandingPageComponent::ngOnInit');
    //this.msalBroadcastService.msalSubject$.subscribe((sub) => { sub.payload == EventType.})
    // for (const account of this.msalService.instance.getAllAccounts()) {
    //   console.log(account);
    // }
  }
}
