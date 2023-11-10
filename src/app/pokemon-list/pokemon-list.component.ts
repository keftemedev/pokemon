import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
  experience: number;
  order: number;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  offset = 0;
  limit = 20;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList() {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`;
    this.http.get<any>(url)
      .subscribe(response => {
        const results = response.results;
        results.forEach((result: any) => {
          const id = this.extractPokemonId(result.url);
          this.loadPokemonDetails(id);
        });
      });
  }

  loadPokemonDetails(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    this.http.get<any>(url)
      .subscribe(response => {
        const pokemon: Pokemon = {
          id: response.id,
          name: response.name,
          height: response.height,
          weight: response.weight,
          image: response.sprites.front_default,
          experience: response.base_experience,
          order: response.order,
        };
        this.pokemons.push(pokemon);
      });
  }

  extractPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }

  viewDetails(id: number) {
    this.router.navigate(['/pokemon', id]);
  }

  loadMorePokemons() {
    this.offset += this.limit;
    this.loadPokemonList();
  }
}