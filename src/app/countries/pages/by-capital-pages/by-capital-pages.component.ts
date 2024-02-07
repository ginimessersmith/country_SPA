import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html',
  styles: [
  ]
})
export class ByCapitalPagesComponent implements OnInit{

  public countries: Country[] = []
  public isLoading:boolean=false
  //? termino de busqueda
  public initialValuePageCapital:string=''

  constructor(private countriesServices: CountriesService) {

  }
  //? reestablecer los paises si estan guardados en el servicio:
  //? evita la busqueda inneceria cuando es el mismo parametro
  ngOnInit(): void {
    this.countries=this.countriesServices.cacheStore.byCapital.countries
    this.initialValuePageCapital=this.countriesServices.cacheStore.byCapital.term
  }

  searchByCapital(term: string): void {
    this.isLoading=true
    this.countriesServices.searchByCapital(term)
      .subscribe( (countries) => {
        this.countries = countries
        this.isLoading=false
      })
  }
}
