import React from "react";


const RotatedEl = ( { text, icon, colorRange, hover, data } ) => {

    function bgColor(value, scaleVal) {
        value = Math.min(value, scaleVal)
        var scale = value / scaleVal;
        var hslPos = 120 - (120 * scale);
        return hslPos
    };


    return (
        <span className='rotation-wrapper-outer' style={{ backgroundColor: `hsl(${bgColor(text, colorRange)},  100%, 50%)`}}>
            <div className="rotation-wrapper-inner">
                <span className='rotate' data-hover={ data } title={ `${ hover } ${ new Date( Number(data) ).toLocaleDateString() }` }>
                    <span>{icon} {text}</span>
                </span>
            </div>
        </span>
        
    );
};

export default RotatedEl;
