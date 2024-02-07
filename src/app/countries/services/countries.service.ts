import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-stores.interface';
import { Region } from '../interfaces/region.type';



@Injectable({ providedIn: 'root' })
export class CountriesService {

  private urlApiBase = 'https://restcountries.com/v3.1'

  //? informacion persistente, el termino de busqueda y el arreglo de la busqueda (paises)
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStore()//? cargar los datos si existen en el local store
  }
  //! REFACTORIZACION:
  getCountriesRequest(url: string): Observable<Country[]> {

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => of([])),
        delay(2000)//? se detiene por 2 segundos el observable, luego recien realiza la busqueda por paises
      )
  }
  searchByCountryAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.urlApiBase}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),//? para transformar la informacion
        catchError(error => of(null))
      )

  }

  searchByCapital(buscar: string): Observable<Country[]> {
    //* return this.httpClient.get<Country[]>(`${this.urlApiBase}/capital/${buscar}`)
    //*   .pipe(
    //*     catchError(error => {
    //*       console.log(error)
    //*       return of([])
    //*     })//! si existe un error retornar un observable que es un arreglo vacio
    //*     // tap(countries => console.log('pasamos por el tap', countries)),//! se imprime en consola cada elemento del arreglo
    //*     // map(countries => []),//! aqui cada elemento del arreglo se actualiza a uno vacio
    //*     // tap(countries => console.log('pasamos por el tap2', countries)),//! aqui ya no se mostrara un arreglo vacio gracias al map
    //*   )
    //! REFACTORIZACION:
    const url = `${this.urlApiBase}/capital/${buscar}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => {
          this.cacheStore.byCapital = { term: buscar, countries }//* guardar los datos de la busqueda en la interface, evitando otra busqueda innecesaria
        }),//? no influye en nada de la emision del observable
        tap(() => this.saveToLocalStore())
      )
  }

  searchByCountry(buscar: string): Observable<Country[]> {
    //! REFACTORIZACION:

    const url = `${this.urlApiBase}/name/${buscar}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(
          countries => {
            this.cacheStore.byCountries = { term: buscar, countries }
          }
        ),
        tap(() => this.saveToLocalStore())
      )

  }

  searchByRegion(buscar: Region): Observable<Country[]> {
    //! REFACTORIZACION:
    const url = `${this.urlApiBase}/region/${buscar}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => {
          this.cacheStore.byRegion = { region: buscar, countries }
        }),
        tap(() => this.saveToLocalStore())
      )

  }

  //! METODOS PARA GUARDAR EN EL LOCAL STORE:
  private saveToLocalStore(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStore(): void {
    if (localStorage.getItem('cacheStore')) {
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    }

  }

}
