import {Component} from '@angular/core';

@Component({
  template: `
    <div>
      This is my home {{ title }}
    </div>
  `
})
export class HomeComponent {
  title = "never";
}
