import  React, { useState, useEffect }  from "react";
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from "../../helpers/AuthHandler";
import AdItem from "../../components/partials/AdItem";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents";

const Page = () => {

    
    const api = useApi();

    const useQueryString = () => {
        return new URLSearchParams (useLocation().search);
    }
    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
    console.log(q);

    const [name, setName] = useState('');
    const [stateLoc, setstateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmePassword, setconfirmePassword] = useState(false);

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [adList, setAdList] = useState([]);

    useEffect(()=> {
        const getRecentAds = async () => {
            const json = await api.getUserAds({
                sort:'desc',
                limit:12 ,
                q
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    useEffect(()=> {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    const handleSubimit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        setError('');

        if(password !== confirmePassword) {
            setError('As senhas não conferem');
            setDisabled(false);
            return;
        }

        const json = await api.register(name, stateLoc, email, password);

        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = './';
        }

        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Minha Conta</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubimit}>
                    <label className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input 
                                type="name" 
                                disabled={disabled}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select value={stateLoc} onChange={e=>setstateLoc(e.target.value)} required>
                                <option></option>
                                {stateList.map((i,k)=>
                                            <option key={k} value={i._id}>{i.name}</option>
                                        )
                                    }
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={confirmePassword}
                                onChange={e=>setconfirmePassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                            {adList.map((i,k)=>
                               <AdItem key={k} data={i} /> 
                            )}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>

                    <hr/>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et ipsum ultrices ex accumsan sollicitudin in at sapien. Fusce finibus maximus purus, ut sagittis odio accumsan sed. Etiam id ex sagittis, porttitor lectus sit amet, fermentum sapien. Nulla molestie velit vel enim pretium, sed bibendum metus tempor.</p>
                </PageArea>
            </PageContainer>
        </PageContainer>
    );
}

export default Page;