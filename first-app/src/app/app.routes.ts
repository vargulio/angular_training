import { Routes } from '@angular/router';
import { BuildPokemonComponent } from './build-pokemon/build-pokemon.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

export const routes: Routes = [

    {
        path: 'create',
        component: BuildPokemonComponent
    }, 
    {
        path: 'details/:id',
        component: PokemonDetailsComponent
    },
    {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
