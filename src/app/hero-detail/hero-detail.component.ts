import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() doctor: Hero;
  heroes:Hero [];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.heroes= HEROES;


      for (var i=0; i < this.heroes.length; i++) {
        if (this.heroes[i].id === id) {
            this.doctor=this.heroes[i];
        }
      }


    // this.heroService.getHero(id)
    //   .subscribe(hero => this.hero = hero);
 
 
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.doctor)
      .subscribe(() => this.goBack());
  }
}
