import { AfterViewInit, Component } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // проверка дали google.maps е готов
    if (typeof google !== 'undefined' && google.maps) {
      this.initMap();
    } else {
      // ако скриптът още не е зареден, изчакай малко
      const interval = setInterval(() => {
        if (typeof google !== 'undefined' && google.maps) {
          clearInterval(interval);
          this.initMap();
        }
      }, 100);
    }
  }

  private initMap(): void {
    const marker = { lat: 42.6936, lng: 23.3190 };
    
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: marker,
        zoom: 16
      }
    );

    new google.maps.Marker({
      position: marker,
      map: map
    });
  }
}
