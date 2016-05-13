import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Mobber}           from './mobber';
import {Mob}           from './mob';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class MobService {
  constructor (private http: Http) {}

  private _mobUrl = 'http://localhost:5050/mob';

  getMobs (): Observable<Mob[]> {
    return this.http.get(this._mobUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getMob (id : number) {
    return this.http.get(this._mobUrl + "/" + id)
        .map(this.extractData)
        .catch(this.handleError);
  }

  addMob (mob: Mob): Observable<Mob> {
    let body = JSON.stringify(mob);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._mobUrl, body, options)
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
    let errMsg = error.message || 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
