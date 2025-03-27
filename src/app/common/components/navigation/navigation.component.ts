import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { UserRole } from '../../../models/user-role.model';
import { ShowAuthDirective } from '../../directives/show-auth.directive';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'tc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [LogoComponent, RouterModule, CommonModule, ShowAuthDirective, NgOptimizedImage],
})
export class NavigationComponent {
  userRole$: Observable<UserRole>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userRole$ = this.userService.userRole$;
  }

  logOut(): void {
    this.authService.signOut();
    this.router.navigate(['']);
  }
}
