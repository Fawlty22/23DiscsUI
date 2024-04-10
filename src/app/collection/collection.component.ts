import { Component, OnInit} from '@angular/core';
import { BagComponent } from '../bag/bag.component';
import { MatIconModule } from '@angular/material/icon';
import { DiscService } from '../core/services/disc.service';
import { Disc } from '../core/models/disc.interface';
import {MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DiscSearchComponent } from '../core/components/disc-search/disc-search.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [BagComponent, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  collection: Disc[] = [];
  bag: Disc[] = [];
  loggedInUser = this.authService.loggedInUser;
  constructor(private discService: DiscService, private authService: AuthService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.discService.getCollection(this.loggedInUser().id)
    .pipe(take(1))
    .subscribe(
      (response: Disc[]) => {
        this.collection = response;
    });
  }

  openDiscSearchModal(){
    const dialogRef = this.dialog.open(DiscSearchComponent, {disableClose: false, width: '80vw', height: '75vh'})
    dialogRef.afterClosed().subscribe(result => {
      console.log('afterclosed',result);
    })
  }

}
