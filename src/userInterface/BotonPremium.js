import './Css/BotonPremium.css';
import { NavLink } from 'react-router-dom';

export const BotonPremium = () => {
    return (
        <NavLink className='navlink' to='premium'>
            <div className="BotonPremium">
                <div className="contenedor">
                    <div>
                        <span>
                                Premium
                        </span>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}