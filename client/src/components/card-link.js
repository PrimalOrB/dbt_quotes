import React from "react";

const CardLink = ( { icon, text, url, target } ) => (
<a className='cardLink' href={ url } target={ target }>
    <p>{ icon }{ text }</p>
    
</a>
);

export default CardLink;
