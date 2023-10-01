type GenericObject = {
    [key: string]: string
}

export function parseQuery(queryString: string | undefined): GenericObject | undefined {
    if (queryString === undefined) {
        return undefined
    }

    var query: GenericObject= {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
