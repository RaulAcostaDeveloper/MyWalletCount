import { useState } from 'react';
import './Css/PrincipalPage.css';
import { NavLink } from 'react-router-dom';
import { BotonPremium } from './BotonPremium';
export const PrincipalPage = ({ ingreso, restante, handleIngreso, promedioDiario }) => {
    const [ value, setValue ] = useState('');

    const changeInput = (e) => {
        e.preventDefault();
        //Validación
        if (value.length > 0 && value.length < 15) {
            handleIngreso( value );
        }
        setValue('');
    }

    return ( 
        <div className='userInterface'>
            <BotonPremium>
            </BotonPremium>
            <div className='principalPage'>
                <div className='header'>
                    <span>My Wallet Count</span>
                </div>
                <div className='contenedorIngresoQuincenal'>
                    <div className='contenedorValorIngresoQuincenal'>
                        <span>${ingreso}</span>
                    </div>
                    <form onSubmit={changeInput}>
                        <input type={'number'} value={value} onChange={(e)=> setValue(e.target.value)}/>
                    </form>
                    <div className='ingresoQuincenalSpan'>
                        <span>Ingreso quincenal</span>
                    </div>
                </div>
                <div className='contenedorPromedioDiarioLibre'>
                    <div className='contenedorValorPromedioDiario'>
                        <span>${promedioDiario}</span>
                    </div>
                    <div className='promedioDiarioSpan'>
                        <span>Promedio diario libre</span>
                    </div>
                </div>

                <div className='contenedorRestante'>
                    <div className='contenedorValorRestante'>
                        <span>${restante}</span>
                    </div>
                    <div className='restanteSpan'>
                        <span>Cantidad total libre</span>
                    </div>
                </div>
                <NavLink className='navlink' to='ahorros'>
                    <div className='listaBoton'>
                        <div className='ahorrosBoton'>
                            <span>Mis inversiones y ahorros</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink className='navlink' to='gastos'>
                    <div className='listaBoton'>
                        <div className='gastosBoton'>
                            <span>Mis gastos fijos</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink className='navlink' to='lujos'>
                    <div className='listaBoton'>
                        <div className='lujosBoton'>
                            <span>Mis lujos</span>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}