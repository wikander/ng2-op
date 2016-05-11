import {Component } from '@angular/core';
import {Mobber} from './mobber';
import {Mob} from './mob';
import {MobDetailComponent} from './mob-detail.component';

@Component({
  selector: 'my-hero-detail',
  directives: [MobDetailComponent],
  providers: [],
  templateUrl: 'app/create-mob.template.html'
})
export class CreateMobComponent {
  private mobber: Mobber;
  private mob: Mob;
  private order: number;

  constructor() {
    this.mobber = new Mobber();
    this.mob = new Mob(15);
    this.order = 1;
  }

  addMember() {
    console.log("click");
    this.mobber.order = this.order;
    this.order++;
    this.mob.mobbers.push(this.mobber);
    this.mobber = new Mobber();
  }
}
