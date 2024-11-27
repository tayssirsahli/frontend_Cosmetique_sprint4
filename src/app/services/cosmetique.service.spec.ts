import { Cosmetique } from './../model/Cosmetique.model';
import { TestBed } from '@angular/core/testing';
import { CosmetiqueService } from './cosmetique.service';


describe('CosmetiqueService', () => {
  let service: CosmetiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmetiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
