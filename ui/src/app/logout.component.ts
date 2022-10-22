import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-logout',
  template: '',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
  ) {
    console.log('In LogoutComponent::ctor');
  }

  ngOnInit() {
    console.log('In LogoutComponent::ngOnInit');
    this.msalService.logout();
  }
}
