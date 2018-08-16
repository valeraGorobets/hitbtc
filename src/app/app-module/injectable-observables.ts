import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class InjectableObservables {
  public prices$ = new ReplaySubject();

  constructor() { }
}
