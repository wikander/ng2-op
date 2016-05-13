import {Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, RouteSegment} from '@angular/router';
import {Mobber} from './mobber';
import {Mob} from './mob';
import {MobDetailComponent} from './mob-detail.component';

@Component({
  selector: 'edit-mob',
  directives: [MobDetailComponent, ROUTER_DIRECTIVES],
  providers: [],
  templateUrl: 'app/edit-mob.template.html'
})


export class EditMobComponent implements OnInit{
  private mobber: Mobber;
  private mob: Mob;
  private order: number;

  private mobId: string;

  constructor(private routeSegment : RouteSegment) {
    this.mobber = new Mobber();
    this.mob = new Mob(15);
    this.order = 1;
  }

  ngOnInit() {
    //let id = this.routerParams.get('id');
    console.log(this.routeSegment.getParam('id'));
  }

  addMember() {
    console.log("click");
    this.mobber.order = this.order;
    this.order++;
    this.mob.mobbers.push(this.mobber);
    this.mobber = new Mobber();
  }
}
