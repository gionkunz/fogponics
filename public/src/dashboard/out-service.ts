import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const jsonHeaders = new Headers({
  'Content-Type': 'application/json'
});
const ledOutUrl = '/api/out/led';

function handleError(error: any): Observable<any> {
  console.error('An error occurred', error);
  return Observable.throw(error.message || error);
}

@Injectable()
export class OutService {
  constructor(private http: Http) {

  }

  getLedValue(): Observable<number> {
    return this.http.get(ledOutUrl)
      .map(response => response.json().value)
      .catch(handleError);
  }

  setLedValue(value: number): Observable<string> {
    return this.http
      .put(ledOutUrl, JSON.stringify({value}), {headers: jsonHeaders})
      .map((response) => response.json().message)
      .catch(handleError);
  }
}
