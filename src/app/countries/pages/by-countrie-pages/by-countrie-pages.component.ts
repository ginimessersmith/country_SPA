import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-countrie-pages',
  templateUrl: './by-countrie-pages.component.html',
  styles: [
  ]
})
export class ByCountriePagesComponent {
  public countries: Country[] = []

  constructor(private countriesService: CountriesService) {

  }

  searchByCountries(buscar: string) {
    this.countriesService.searchByCountry(buscar)
      .subscribe(countries => {
        this.countries = countries
      })
  }
}
