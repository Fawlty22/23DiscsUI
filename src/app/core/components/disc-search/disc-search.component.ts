import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DiscService } from '../../services/disc.service';
@Component({
  selector: 'app-disc-search',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './disc-search.component.html',
  styleUrl: './disc-search.component.scss'
})
export class DiscSearchComponent {
  discName: string = '';
  constructor(private discService:DiscService, public dialogRef: MatDialogRef<DiscSearchComponent>){}
  
  close(){
    this.dialogRef.close();
  }

  searchForDisc(){
    this.discService.getDiscByName(this.discName).subscribe(res => console.log(res))
  }
}
