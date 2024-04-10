import { Component, Input } from '@angular/core';
import {Disc} from '../core/models/disc.interface';
import { MatIconModule } from '@angular/material/icon';
import { DiscService } from '../core/services/disc.service';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent {
  @Input() collection: Disc[] = [];

  constructor(private discService: DiscService){}
  
  addDiscToCollection(disc:Disc){
    disc.bag = false;
    const newDisc = this.discService.updateDisc(disc).pipe(take(1)).subscribe()
  }
}
