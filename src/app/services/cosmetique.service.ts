import { Injectable } from '@angular/core';
import { Cosmetique } from '../model/Cosmetique.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CosmetiqueService {
  apiURL: string = 'http://localhost:9095/cosmetiques/api/all';


  cosmetiques!: Cosmetique[]; //un tableau 
  //categories : Categorie[];


  constructor(private http: HttpClient) {

  }

  listeCosmetique(): Observable<Cosmetique[]> {
    return this.http.get<Cosmetique[]>(this.apiURL);
  }





}