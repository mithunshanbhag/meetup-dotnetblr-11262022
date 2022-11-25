import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-logout',
  template: '',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private msalService: MsalService,
  ) {
    console.log('In LogoutComponent::ctor');
  }

  ngOnInit() {
    console.log('In LogoutComponent::ngOnInit');
    this.msalService.logout();
  }
}
