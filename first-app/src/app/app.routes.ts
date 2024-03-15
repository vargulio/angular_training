import { Routes } from '@angular/router';
import { BuildPokemonComponent } from './build-pokemon/build-pokemon.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { FirstComponentComponent } from './first-component/first-component.component';

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
        path: 'first',
        component: FirstComponentComponent
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
