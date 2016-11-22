import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

const jsonHeaders = new Headers({
  'Content-Type': 'application/json'
});
const ledOutUrl = '/api/out/led';

function handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}

@Injectable()
export class OutService {
  constructor(private http: Http) {

  }

  getLedValue(): Promise<number> {
    return this.http.get(ledOutUrl)
      .toPromise()
      .then(response => response.json().value)
      .catch(handleError);
  }

  setLedValue(value: number): Promise<string> {
    return this.http
      .put(ledOutUrl, JSON.stringify({value}), {headers: jsonHeaders})
      .toPromise()
      .then((response) => response.json().message)
      .catch(handleError);
  }
}
