import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private urlApiBase = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) {

  }

  searchByCountryAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.urlApiBase}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),//? para transformar la informacion
        catchError(error => of(null))
      )

  }

  searchByCapital(buscar: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.urlApiBase}/capital/${buscar}`)
      .pipe(
        catchError(error => {
          console.log(error)
          return of([])
        })//! si existe un error retornar un observable que es un arreglo vacio
        // tap(countries => console.log('pasamos por el tap', countries)),//! se imprime en consola cada elemento del arreglo
        // map(countries => []),//! aqui cada elemento del arreglo se actualiza a uno vacio
        // tap(countries => console.log('pasamos por el tap2', countries)),//! aqui ya no se mostrara un arreglo vacio gracias al map
      )
  }

  searchByCountry(buscar: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.urlApiBase}/name/${buscar}`)
      .pipe(
        catchError(error => of([]))
      )

  }

  searchByRegion(buscar: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.urlApiBase}/region/${buscar}`)
      .pipe(
        catchError(error => of([]))
      )

  }

}
