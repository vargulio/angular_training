import { StringifyPokemonPipe } from './stringify-pokemon.pipe';

describe('StringifyPokemonPipe', () => {
  it('create an instance', () => {
    const pipe = new StringifyPokemonPipe();
    expect(pipe).toBeTruthy();
  });
});
