import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-pages',
  templateUrl: './by-region-pages.component.html',
  styles: [
  ]
})
export class ByRegionPagesComponent {

  public countries: Country[] = []

  constructor(private countriesServices: CountriesService) { }

  searchByRegion(buscar: string) {
    this.countriesServices.searchByRegion(buscar)
      .subscribe(countries => {
        this.countries = countries
      })
  }
}
