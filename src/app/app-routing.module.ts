import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CosmetiquesComponent } from './cosmetiques/cosmetiques.component';
import { AuthGuard } from 'src/app/guards/secure.guard';

const routes: Routes = [
  {path: "cosmetiques", component : CosmetiquesComponent,canActivate:[AuthGuard],data : {roles:['ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
