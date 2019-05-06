import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import 'rxjs/add/operator/filter';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  searchQ:string="";

  constructor(private heroService: HeroService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.searchQ)
    .subscribe(params => {
      this.searchQ = params.searchQ;
      this.getHeroes();
    })

  }

  getHeroes(): void {
    this.heroes= HEROES;


   this.heroes=this.heroes.filter(hero=>{
      return hero.name.toLowerCase().includes(this.searchQ.toLowerCase()) || hero.specialization.toLowerCase().includes(this.searchQ.toLowerCase()) ;
      
      // || hero.address.toLowerCase().includes(this.searchQ.toLowerCase()) || hero.area.toLowerCase().includes(this.searchQ.toLowerCase()) || hero.specialization.toLowerCase().includes(this.searchQ.toLowerCase())

    })

    
      // for (var i=0; i < this.heroes.length; i++) {
      //   if (this.heroes[i].name.toLowerCase().includes(this.searchQ)) {
      //       this.doctor=this.heroes[i];
      //   }
      // }

    // { id: 13, name: 'Bombasto' },
    // { id: 14, name: 'Celeritas' },
    // { id: 15, name: 'Magneta' },
    // { id: 16, name: 'RubberMan' },
    // { id: 17, name: 'Dynama' },
    // { id: 18, name: 'Dr IQ' },
    // { id: 19, name: 'Magma' },
    // { id: 20, name: 'Tornado' }


    // this.heroService.getHeroes()
    // .subscribe(heroes => this.heroes = heroes);
  
  
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
