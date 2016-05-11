import {Component, Input} from '@angular/core';
import {Mobber} from './mobber';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="mobber">
      <h2>{{mobber.name}} details!</h2>
      <div><label>id: </label>{{mobber.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="mobber.name" placeholder="name">
      </div>
    </div>
  `
})
export class HeroDetailComponent {
  @Input()
  mobber: Mobber;
}
