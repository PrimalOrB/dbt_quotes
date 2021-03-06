import React from "react";
import { calc_color_scale, format_date } from '../utils/helpers'

const RotatedEl = ( { text, icon, colorRange, hover, data } ) => {

    const hoverLabel =  data > 100000 ? format_date( data ) : data

    return (
        <span className='rotation-wrapper-outer' style={ { backgroundColor: `hsl( ${ calc_color_scale( text, colorRange ) },  100%, 50%)` } }>
            <div className="rotation-wrapper-inner">
                <span className='rotate' data-hover={ data } title={ `${ hover } ${ hoverLabel }` }>
                    <span>{ icon } { text }</span>
                </span>
            </div>
        </span>
        
    );
};

export default RotatedEl;
