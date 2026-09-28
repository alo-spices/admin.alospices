import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentRole: string = '';
  sidebarCollapsed = false;
  showProfileMenu: boolean = false;

  isSidebarHovered = false;

  constructor(
    private authService: AuthService, private loginService: LoginService, private router: Router
  ) { }

  ngOnInit(): void {

    this.currentRole =
      this.authService.getRole() || '';

  }

  // ==========================================
  // Check Role
  // ==========================================

  hasRole(
    ...roles: string[]
  ): boolean {

    return roles.includes(
      this.currentRole
    );

  }
  // ======================================
  // TOGGLE SIDEBAR
  // ======================================

  toggleSidebar(): void {

    this.sidebarCollapsed = !this.sidebarCollapsed;

    // Expanded state lo hover reset
    if (!this.sidebarCollapsed) {

      this.isSidebarHovered = false;

    }

  }


  // ======================================
  // SIDEBAR MOUSE ENTER
  // ======================================

  onSidebarEnter(): void {

    // Sidebar collapsed unte
    // mouse hover tho expand avvali

    if (this.sidebarCollapsed) {

      this.isSidebarHovered = true;

    }

  }


  // ======================================
  // SIDEBAR MOUSE LEAVE
  // ======================================

  onSidebarLeave(): void {

    // Sidebar collapsed state lo
    // mouse remove chesthe malli collapse avvali

    if (this.sidebarCollapsed) {

      this.isSidebarHovered = false;

    }

  }

  logout(): void {

    this.loginService.logout().subscribe({

      next: (res: any) => {

        console.log("Logout Response:", res);

        if (res?.success) {

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          this.router.navigate(['/login']);

        }

      },

      error: (error: any) => {

        console.error("Logout Error:", error);

        // Even if API fails,
        // clear local login data

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        this.router.navigate(['/login']);

      }

    });

  }
  toggleProfileMenu(event?: MouseEvent): void {

    event?.stopPropagation();

    this.showProfileMenu = !this.showProfileMenu;

  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    const target = event.target as HTMLElement;

    const profileWrapper =
      target.closest('.profile-wrapper');

    if (!profileWrapper) {

      this.showProfileMenu = false;

    }

  }
}

