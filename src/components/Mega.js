import React from 'react';
import List from './List';

function Mega(){

    function Gerar(){
        console.log('teste')
    }

  return (
      <div className="Mega"><h3>Mega-Sena:</h3>
        <button onClick={Gerar}>Gerar</button>
        <List></List>
              
      
      </div>
  )
}

export default Mega;