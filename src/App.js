import React, {useState} from 'react';
import './App.css';
//import Mega from './components/Mega';
import Header from './components/Header';

function App() {

  const [showUl, setShowUl] = useState(false);
  
  let qtDeNum = 6;
  let [numSorte, setNumSort] = useState ([]);
  let num_ignorados = [0];
  
  

  function Gerar(event){
    
    event.preventDefault();
    let sorte=[];
    console.log(document.getElementById('nome').value);
    qtDeNum=document.getElementById('nome').value;
    console.log('Gerado')
    //setNumSort([1,2,3,4,5,60]);
    setShowUl(true);
    for (let i = 0; i < qtDeNum; i++){
      sorte.push(GerarNumero(sorte))
      //console.log(NumNovo);
      console.log(sorte.length);
    }
    sorte.sort(function(a, b) {
      return a - b;
    });
    setNumSort(sorte);
    //console.log(numSorte);
  }

  function GerarNumero(existente){
    let NumNovo = parseInt(Math.random() * 59, 10) + 1;
    if (existente.indexOf(NumNovo) !== -1 || num_ignorados.indexOf(NumNovo) !== -1) NumNovo = GerarNumero(existente);
    return NumNovo
  }

  function Limpar(){

    setNumSort([0]);
    console.log('Limpo',numSorte)
    setShowUl(false);
  }

  return (
    
    <div className="App">
      <Header></Header>


      <div className="Mega"><h3>Mega-Sena:</h3>
        <form>
          <label>Quantidade de números: </label>
          <input onChange={()=>{
            let valor=document.getElementById('nome').value;
            if (valor<6){
              valor = 6;
            }else if (valor > 15){
              valor = 15;
            }else {
              valor=valor;
            }
            document.getElementById('nome').value=valor;

          }} id="nome" type="number" defaultValue={qtDeNum}></input>
          
        </form>
        <button onClick={Gerar} className="">Gerar</button>
        <button onClick={Limpar}>Limpar</button>
          <ul className={showUl ? "show" : "modal unShow"}>
            {numSorte.map(i=><li key={i.id} className="numeroSorte">{[i]}</li>)}
            
            
  
          </ul>  
      
      </div>
          
    </div>
  );
}

export default App;
