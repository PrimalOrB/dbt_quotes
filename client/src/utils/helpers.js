module.exports = {
    format_plural: ( word, amount ) => {
        if( amount !== 1 ) {
            return `${word}s`
        }
        return word
    },
    format_label_case: ( label ) => {
        if( label.length === 3 ) {
            return label.toUpperCase()
        } else {
            function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            return label.split('-').map( capitalize ).join(' ');
        }
    },
    format_date: ( date ) => {
        return new Date( Number( date ) ).toLocaleDateString()
    },
    calc_days_between: ( dateA, dateB ) => {
        var delta = Math.abs( dateA - dateB) / 1000;
        var days = Math.floor( delta / 86400 );
        return days
    },
    calc_days_to_current: ( date ) => {
        const b = new Date()
        date = new Date( Number( date ) )
        const day = 1000 * 60 * 60 * 24;
        const timeDiff = b.getTime() - date.getTime();
        const diff = Math.round( timeDiff / day );
        return { diff };
    },
    calc_color_scale: ( value, scaleSet ) => {
        value = Math.min(value, scaleSet)
        var scale = value / scaleSet;
        var hslPos = 120 - (120 * scale);
        return hslPos
    },
    calc_parse_average: ( input ) => {
        const currentDate = new Date().getTime()
        let count = 0
        let diff = 0
        for( let i = 0; i < input.length; i++ ){
            if( input[i].y > 0){
                count = count + input[i].y
                diff = diff + ( ( currentDate - new Date( input[i].x ).getTime() ) * input[i].y )
            } 
        }
        const avg = diff / count
        const day = 1000 * 60 * 60 * 24;
        return ( avg / day ).toFixed()
    }
}
