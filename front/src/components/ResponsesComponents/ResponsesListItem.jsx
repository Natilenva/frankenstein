// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';



// Inicializamos el componente.
const ResponsesListItem = ({ response }) => {

    return (
    <section>
         <div className="flex mt-3.5 w-full max-w-[305px]">
       
        <div className="flex flex-col flex-1 px-5">
       
            <li>
                
                <div className='bg-black'>
                    <div>

                        <p className="text-xs leading-4 text-white text-opacity-50">
                             { response.response_text}
                        </p>
                    </div>
                    <div className="text-xs leading-4 text-white text-opacity-50">
                        <time>
                            {moment(response.created_at).format(
                                'DD/MM/YYYY [a las] HH:mm'
                            )}
                        </time>
                    </div>
                </div>
            </li>
     
        </div>
        </div>

    </section>
    );
};

// Validamos las props.
ResponsesListItem.propTypes = {
    response: PropType.object,
};

export default ResponsesListItem;
