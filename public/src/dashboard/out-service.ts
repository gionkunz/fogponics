import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const jsonHeaders = new Headers({
  'Content-Type': 'application/json'
});
const outUrl = '/api/out';

function handleError(error: any): Observable<any> {
  console.error('An error occurred', error);
  return Observable.throw(error.message || error);
}

@Injectable()
export class OutService {
  constructor(private http: Http) {

  }

  getValue(out: string): Observable<number> {
    return this.http.get(`${outUrl}/${out}`)
      .map(response => response.json().value)
      .catch(handleError);
  }

  setValue(out: string, value: number): Observable<string> {
    return this.http
      .put(`${outUrl}/${out}`, JSON.stringify({value}), {headers: jsonHeaders})
      .map((response) => response.json().message)
      .catch(handleError);
  }
}
