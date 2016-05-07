import {Hero} from './hero';

export class Mob {

  constructor(minutes: number) {
    this.minutes = minutes;
    this.members = [];
  }
  minutes: number;
  name: string;
  members: Hero[];
}
