import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    // Mock KeycloakService
    mockKeycloakService = jasmine.createSpyObj('KeycloakService', ['loadUserProfile', 'login', 'logout']);
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: KeycloakService, useValue: mockKeycloakService }
      ]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular_Keycloak_depart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular_Keycloak_depart');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular_Keycloak_depart app is running!');
  });

  it('should call login when onLogin is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onLogin();
    expect(mockKeycloakService.login).toHaveBeenCalled();
  });

  it('should call logout when onLogout is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onLogout();
    expect(mockKeycloakService.logout).toHaveBeenCalled();
  });

  it('should load user profile if authenticated', () => {
    // Mock the user profile to be loaded successfully
    const mockProfile = { username: 'testUser' };
    mockKeycloakService.loadUserProfile.and.returnValue(Promise.resolve(mockProfile));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const app = fixture.componentInstance;
    expect(app.profile).toEqual(mockProfile);
  });

  it('should show login button if not logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button.btn-success')).toBeTruthy();
  });

  it('should display username if logged in', () => {
    const mockProfile = { username: 'testUser' };
    mockKeycloakService.loadUserProfile.and.returnValue(Promise.resolve(mockProfile));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.nav-link span')?.textContent).toContain('testUser');
  });
});
