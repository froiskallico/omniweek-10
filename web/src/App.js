import React from 'react';

import './global.css';
import './App.css';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação;
// Propriedade: Informações que um componente PAI passa para um componente FILHO. i.e: <Header title="Titulo 1" />. Usa-se a propriedade props.title dentro do componente Header.js;
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade); Para usar usa useState.

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input_block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required></input>
          </div>

          <div className="input_block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required></input>
          </div>

          <div className="input_block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required></input>
          </div>

          <div className="input-group">
            <div className="input_block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required></input>
            </div>
            
            <div className="input_block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required></input>
            </div>
          </div>

        </form>
      </aside>
      <main>

      </main>
    </div>
  );
};

export default App;
