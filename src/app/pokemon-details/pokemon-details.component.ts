import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: any[];
  image: string;
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon = {} as Pokemon;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPokemonDetails(id);
    }
  }

  loadPokemonDetails(id: string) {
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .subscribe(response => {
        this.pokemon = {
          id: response.id,
          name: response.name,
          height: response.height,
          weight: response.weight,
          stats: response.stats,
          image: response.sprites.front_default
        };
      });
  }
}