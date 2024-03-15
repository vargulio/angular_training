import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, from, of, switchMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {

   

    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=20', {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      switchMap((event: any) => {
        return from([]);
      }),
      concatMap((element: any) => {
        return this.http.get(element.url);
      }),
      catchError((error) => {
        return of(null)
      }),
      toArray()
    );



  }
}
