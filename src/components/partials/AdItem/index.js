import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './styled';

export default (props) => {
    let price = '';

    if(props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

    let image = '';

    if(props.data.image !== "http://alunos.b7web.com.br:501/media/default.jpg") {
        image = `${props.data.image}`;
    } else {
        
        image = "./semimagem.png";
    }

    return(
        <Item className="aditem">
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={image} alt="" />
                </div>
                <div className="itemName">
                    {props.data.title}
                </div>
                <div className="itemPrice">{price}</div>
            </Link>

        </Item>
    );
}