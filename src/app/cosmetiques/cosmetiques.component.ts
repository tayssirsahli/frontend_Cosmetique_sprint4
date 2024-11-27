import { CosmetiqueService } from './../services/cosmetique.service';
import { Component, OnInit } from '@angular/core';
import { Cosmetique } from '../model/Cosmetique.model';

@Component({
  selector: 'app-cosmetiques',
  templateUrl: './cosmetiques.component.html',
  styleUrls: ['./cosmetiques.component.css']
})
export class CosmetiquesComponent implements OnInit {

  cosmetiques!: Cosmetique[]; 

  constructor(private cosmetiqueService: CosmetiqueService) {

  }


  ngOnInit(): void {

    this.chargerCosmetiques();
  }

  chargerCosmetiques() {
    this.cosmetiqueService.listeCosmetique().subscribe(cosms => {
      console.log(cosms);
      this.cosmetiques = cosms;
    });
  }





}
