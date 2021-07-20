exports.revokeQuote = function(field){
    return field.toString().replace(/"/g, "'")
}

exports.antiInjection = function(){
    return /[<>}={_|^*~$]/
}

exports.antiInjectionMore = function(){
    return /[<>}="{_|'^*~$]/
}

exports.email = function(){
    return new RegExp('^[a-zA-Z0-9._%+-]{2,}[@]{1}[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,3}$', 'g')
}

exports.name = function(){
    return new RegExp('^[a-zA-Z]{2,}$')
}