import React from "react";
import { dropDownMaterial } from "../utils/dropdowns";

const CardLink = ( { icon, text, url, target, status } ) => {
    if( url ){
        return (
            <a className='cardLink' href={ url } target={ target } title={ status ? dropDownMaterial.find( x => x.value === status ).label : text }>
                <p>{ icon }{ text }</p>
            </a>
        )
    } else {
        return (
            <span className='cardLink' title={ dropDownMaterial.find( x => x.value === status ).label }>
                <p>{ text }</p>
            </span>
        )
    }
    };

export default CardLink;
