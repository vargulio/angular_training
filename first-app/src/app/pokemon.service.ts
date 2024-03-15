import { Inject, Injectable } from '@angular/core';
import { Pokemon } from './pokemon-card/pokemon-card.component';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, concatMap, from, mergeMap, of, switchMap, toArray } from 'rxjs';
import { injToken } from './app.config';

@Injectable({
  providedIn: "root"
})
export class PokemonService {

  
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {

    const headers = new HttpHeaders().set('X-auth-token', 'bahur');

    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=20').pipe(
      switchMap((response: any) => {
        return from(response.results);
      }),
      mergeMap((element: any) => {
        return this.http.get(element.url);
      }),
      catchError((error) => {
        return of(null)
      }),
      toArray()
    );



  }
}
