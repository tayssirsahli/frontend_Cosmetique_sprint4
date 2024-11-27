import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CosmetiquesComponent } from './cosmetiques/cosmetiques.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',  // URL de votre serveur Keycloak
        realm: 'tayssir-realm',
        clientId: 'cosmetique-app'
      },
      initOptions: {
        onLoad: 'check-sso',  // Vérification SSO sans forcer une connexion
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',  // Pour plus de sécurité, utilisez PKCE
        flow: 'standard',  // Assurez-vous d'utiliser le bon flux d'authentification
      }
    }).then(() => {
      // Optionnel : activer un débogage plus détaillé si nécessaire
      const keycloakInstance: any = keycloak.getKeycloakInstance();
      keycloakInstance.logLevel = 'debug';  // Ajustez le niveau de log pour déboguer

      console.log('Keycloak initialization succeeded');
    }).catch((error) => {
      console.error('Keycloak initialization failed:', error);
      if (error?.message) {
        console.error('Error message:', error.message);
      }
      if (error?.stack) {
        console.error('Error stack:', error.stack);
      }
      if (error?.details) {
        console.error('Error details:', error.details);
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    CosmetiquesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
