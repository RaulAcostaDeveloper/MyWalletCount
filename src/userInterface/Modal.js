import './Css/Modal.css';
export const Modal = ( { mensageModal, setOpenModal }) => {
    return (
        <div className='userInterface'>
            <div
                className="contenedorModal"
                onClick={ () => { setOpenModal (false ) } } >

                <div className='cuadroModal'>
                    <button className='botonCerrar' onClick={ () => { setOpenModal (false ) } }>X</button>
                    {mensageModal}
                </div>
            </div>
        </div>
    )
}