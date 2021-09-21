import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import places, { PlacesInstance }  from 'places.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PlaceSearch';

  public form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      name: [''],
      address: [{
        address: '78 Rue du Moulin Vert, Paris 14e Arrondissement, Île-de-France, France',
        lat: 48.8304,
        lng: 2.32209
      }]
    })
  }
}
