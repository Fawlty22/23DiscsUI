import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DiscService } from '../../services/disc.service';
import {take} from 'rxjs';
import { DiscSearchResult } from '../../models/disc-search-result.interface';
import { Disc } from '../../models/disc.interface';

@Component({
  selector: 'app-disc-search',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './disc-search.component.html',
  styleUrl: './disc-search.component.scss'
})
export class DiscSearchComponent {
  discName: string = '';
  searched: boolean = false;
  results: DiscSearchResult[] = [];
  collection: Disc[] = [];
  constructor(private discService:DiscService, public dialogRef: MatDialogRef<DiscSearchComponent>){}
  
  close(){
    this.dialogRef.close();
  }

  searchForDisc(){
    if(!this.discName) return;
    this.discService.getDiscByName(this.discName)
    .pipe(take(1))
    .subscribe((responseDiscs: DiscSearchResult[]) => {
      this.results = responseDiscs;
      this.searched = true;this.results = responseDiscs;
    })
  }

  addDiscToCollection(discData: DiscSearchResult){
    const newDisc = this.discService.translateToDisc(discData);
    console.log(newDisc);
    this.discService.addDiscToCollection(newDisc)
    .pipe(take(1))
    .subscribe((response: Disc) => this.collection.push(response));
  }

  
}
