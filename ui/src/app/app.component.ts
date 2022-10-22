import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {

  constructor() {
    console.log('In AppComponent::ctor');
  }
}
