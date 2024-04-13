import { Component, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { DiscService } from '../../services/disc.service';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ MatToolbarModule, MatTooltipModule, MatIconModule, MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() title: string = '';

constructor(private authService: AuthService, private discService: DiscService){}
  logout(){
    this.discService.collection$.set([]);
    this.authService.logout();
  }
}
