import { Component } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-info-banner',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './info-banner.component.html',
  styleUrl: './info-banner.component.css'
})
export class InfoBannerComponent {

}
