import  React, { useState, useEffect }  from "react";
/*import { useParams } from "react-router";*/
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { PageArea, Fake, OthersArea, BreadChumb } from './styled';
import useApi from '../../helpers/OlxAPI';


import { PageContainer } from "../../components/MainComponents";
import  adItem from "../../components/partials/AdItem";
import { useParams, Link } from "react-router-dom";

const Page = () => {
    const api = useApi();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState([]);

    useEffect(()=>{
        const getAdinfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdinfo(id);
    }, []);

    const formatDate = (date) => {
        let cDate = new Date(date);

        let months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    };

    return (
        <PageContainer>
            {adInfo.category &&
                <BreadChumb>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat={/ads?state=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}
                    
                </BreadChumb>
            }
            <PageArea>
               <div className="leftSide">
                   <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300}  />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, k) =>
                                        <div key={k} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className="adInfor">
                            <div className="adName">
                                {loading && <Fake height={20} />} 
                                {adInfo.title && 
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated && 
                                    <small>Criade em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100} />} 
                                {adInfo.description}
                                <hr/>
                                {adInfo.views &&
                                <small>Visualizações: {adInfo.views}</small>}
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="rightSide">
                    <div className="box box--padding">
                        {loading && <Fake height={100} />} 
                        {adInfo.priceNegotiable &&
                            "Preço Necioável"
                        }  
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price} </span></div>
                        }
                    </div>

                    {loading && <Fake height={50} />}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink">Fale com o vendedor</a>
                            <div className="createdBy box box--padding">
                                Criado por:
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>{adInfo.userInfo.email}</small>
                                <small>{adInfo.stateName}</small>
                            </div>
                        </>
                    
                    }
                    
                </div>
               

            </PageArea>
            <OthersArea>
            {adInfo.others &&
                <>
                    <h2></h2>
                    <div className="list">
                        {adInfo.others.map((i,k)=>
                            <adItem key={k} data={i} />
                        )}

                    </div>
                </>
                
            }
            </OthersArea>
        </PageContainer>
    );
}

export default Page;