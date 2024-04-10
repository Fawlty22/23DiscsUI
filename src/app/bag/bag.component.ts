import { Component, Input } from '@angular/core';
import {Disc} from '../core/models/disc.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent {
  @Input() discs: Disc[] = [];
  
}
