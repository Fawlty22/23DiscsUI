import { Component, Input } from '@angular/core';
import {Disc} from '../core/models/disc.interface';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent {
  @Input() discs: Disc[] = [];
  
}
