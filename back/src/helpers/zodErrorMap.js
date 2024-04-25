
function zodErrorMap (zodIssues) {
    const errors = {}; 

    zodIssues.forEach(issue => {
        const propName = issue.path[0];
        const message = issue.message;

        // Si no existe un error en ese campo lo añadimos en una nueva propiedad del objeto 
        //y poniendo el mensaje de error en un array
        if (!errors[propName]) {
          errors[propName] =  [message];   
          return   
        }
        // En cambio, si ya existe un error en ese elemento lo añadimos al final del array de mensajes 
        errors[propName] = [...errors[propName], message];
      
    });

    return errors;
}
export { zodErrorMap };