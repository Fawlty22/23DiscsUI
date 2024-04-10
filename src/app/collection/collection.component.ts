import { Component, OnInit, ViewChild, effect} from '@angular/core';
import { BagComponent } from '../bag/bag.component';
import { MatIconModule } from '@angular/material/icon';
import { DiscService } from '../core/services/disc.service';
import { Disc } from '../core/models/disc.interface';
import {MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DiscSearchComponent } from '../core/components/disc-search/disc-search.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

import { take } from 'rxjs';
@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [BagComponent, MatIconModule, MatDialogModule, MatButtonModule, MatMenuModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  collection = this.discService.collection;

  constructor(private discService: DiscService, private authService: AuthService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.discService.setCollection(this.authService.loggedInUser().id);
  }

  openDiscSearchModal(){
    const dialogRef = this.dialog.open(DiscSearchComponent)
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      
    })
  }

  addDiscToBag(disc: Disc): void {
    const updatedDisc = {...disc, bag:true}
    const newDisc = this.discService.updateDisc(updatedDisc).pipe(take(1)).subscribe()
    
  }

  deleteDisc(discId:number){
    this.discService.deleteDisc(discId).pipe(take(1)).subscribe()
  }


}
