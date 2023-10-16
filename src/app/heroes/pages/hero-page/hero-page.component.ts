import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {
  public heroe?:Hero;
  constructor(
    private heroesService:HeroesService,
    private activatedRouted:ActivatedRoute,
    private router:Router){

  }
  ngOnInit(): void {
    this.activatedRouted.params
      .pipe(
    
        switchMap(({id})=>this.heroesService.getHeroById(id)),
      ).
      subscribe(hero=>{
        if(!hero)return this.router.navigate([ '/heroes/list' ]);
        this.heroe=hero;
        console.log(hero);
        return;
      });
  }
  goBack(){
    this.router.navigateByUrl('heroes/list');
  }
}
