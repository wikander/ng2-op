import {Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, RouteSegment} from '@angular/router';
import {Mobber} from './mobber';
import {Mob} from './mob';
import {MobDetailComponent} from './mob-detail.component';
import {MobService} from './mob.service';

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

  constructor(private routeSegment : RouteSegment, private service: MobService) {
    this.mobber = new Mobber();
    this.mob = new Mob(15);
  }

  ngOnInit() {
    var id = this.routeSegment.getParam('id');
    this.service.getMob(+id).subscribe(
        mob => {
          this.mob = mob;
        }
    );
  }

  addMember() {
    this.mobber.order = this.order;
    this.order++;
    this.mob.mobbers.push(this.mobber);
    this.mobber = new Mobber();
  }
}