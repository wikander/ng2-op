import {Component} from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <div class="home-container">
        <img class="logo" src="img/op-logo-black.png">
        <h1>Omegapoint Mob Timer</h1>
    </div>
  `,
  styles: [`.home-container {
    padding-top: 100px;
  }
  .logo {
    position: fixed;
    right: 15px;
    top: 15px;
  }
  h1 { text-align: center;}
  `],
})
export class HomeComponent {
}
