import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-countrie-pages',
  templateUrl: './by-countrie-pages.component.html',
  styles: [
  ]
})
export class ByCountriePagesComponent implements OnInit {
  public countries: Country[] = []
  public isLoading:boolean=false
  public initValuePageCountries:string=''

  constructor(private countriesService: CountriesService) {

  }
  ngOnInit(): void {
    this.countries=this.countriesService.cacheStore.byCountries.countries
    this.initValuePageCountries=this.countriesService.cacheStore.byCountries.term
  }

  searchByCountries(buscar: string) {
    this.isLoading=true
    this.countriesService.searchByCountry(buscar)
      .subscribe(countries => {
        this.countries = countries
        this.isLoading=false
      })
  }
}
