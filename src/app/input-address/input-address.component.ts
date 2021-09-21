import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { PlacesInstance } from 'places.js';
import places from 'places.js';
import leaflet from 'leaflet';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputAddressComponent),
    },
  ],
})
export class InputAddressComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  private onChange;
  private onTouched;
  private placesAutocomplete: PlacesInstance;
  @ViewChild('address_input', { static: true })
  public address_input: ElementRef;
  @ViewChild('map', { static: true })
  public mapEl: ElementRef;
  public map;
  public innerValue = {
    address: '',
    lat: 0.0,
    lng: 0.0,
  };

  constructor() {}

  ngAfterViewInit(): void {
    this.placesAutocomplete = places({
      appId: 'plQNWZU0Q6KP',
      apiKey: '32bfe452706d74878d3117e163983a8c',
      container: this.address_input.nativeElement,
    });

    this.placesAutocomplete.on('change', (e) => {
      if (e.suggestion) {
        this.innerValue.lat = e.suggestion.latlng.lat;
        this.innerValue.lng = e.suggestion.latlng.lng;
        this.innerValue.address = e.suggestion.value;
        this.onChange(this.innerValue);
        this.addMarker();
      }
    });

    this.map = leaflet.map(this.mapEl.nativeElement);
    if (this.innerValue.lat) {
      this.addMarker();
    } else {
      this.map.setView([48.864716, 2.349014], 13);
    }

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      })
      .addTo(this.map);
  }

  ngOnInit(): void {}

  writeValue(value): void {
    this.innerValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  private addMarker() {
    const coord: [number, number] = [this.innerValue.lat, this.innerValue.lng];
    leaflet.marker(coord).addTo(this.map);
    this.map.setView(coord, 13);
  }
}
