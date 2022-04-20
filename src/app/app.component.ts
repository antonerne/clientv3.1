import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Osan Scheduler';

  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer, 
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public menuService: MenuService) {
    iconRegistry.addSvgIcon('scheduler', 
    sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/calendar.svg'));
    var token = authService.getToken();
    if (!token || token == "") {
      this.router.navigate(['/home']);
    } else {
      var user = this.authService.getUser();
      if (user) {
        this.menuService.getMenus(user.roles);
      } else {
        this.menuService.clearMenus();
      }
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.authService.logout();
    this.menuService.clearMenus();
  }
}
