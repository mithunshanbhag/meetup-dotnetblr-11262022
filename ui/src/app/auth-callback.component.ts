import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-auth-callback',
  template: `
    <div style="text-align:center">
      <h1>{{title}}</h1>
    </div>
  `,
  styles: []
})
export class AuthCallbackComponent implements OnInit {
  title = 'demo: implicit flow (authcallback)';

  constructor(
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
  ) {
    console.log('In AuthCallbackComponent::ctor');
  }

  ngOnInit() {
    console.log('In AuthCallbackComponent::ngOnInit');
    console.log('Redirecting to landing page...');
    this.router.navigate(['/']);
  }
}
