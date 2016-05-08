import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Hero}           from './hero';
import {Mob}           from './mob';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}
  private _heroesUrl = 'http://localhost:5050/mob';  // URL to web api
  getHeroes (): Observable<Mob[]> {
    return this.http.get(this._heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addMob (mob: Mob): Observable<Mob> {
    let body = JSON.stringify(mob);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._heroesUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
