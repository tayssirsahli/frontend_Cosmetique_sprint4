import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des Cosmétiques';
  public profile?: KeycloakProfile;
  public hasAdminRole = false;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    // Check if the user is logged in
    const isLoggedIn = await this.keycloakService.isLoggedIn();

    if (isLoggedIn) {
      // Load user profile
      this.keycloakService.loadUserProfile().then(profile => {
        this.profile = profile;

        // Check if the user has the "ADMIN" role
        const roles = this.keycloakService.getUserRoles();
        this.hasAdminRole = roles.includes('ADMIN');
      });
    }
  }

  onLogin() {
    this.keycloakService.login({
      redirectUri: window.location.origin 
    });
  }
  
  onLogout() {
    this.keycloakService.logout(window.location.origin); 
  }
  
}
