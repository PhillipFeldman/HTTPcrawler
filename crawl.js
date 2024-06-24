const {JSDOM} = require('jsdom')

function getURLSfromHTML(htmlBody,baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkelements = dom.window.document.querySelectorAll('a')
    for (const linkelement of linkelements) {
        


        if(linkelement.href.slice(0,1)==='/'){
            try{
                const urlOBJ = new URL(baseURL+linkelement.href)
                urls.push(baseURL+linkelement.href)
            }
            catch(err){
                console.log(`bad url:${linkelement.href},\n ${err.message}`)
            }


            
        }else{
            try{
                const urlOBJ = new URL(linkelement.href)
                urls.push(linkelement.href)
            }
            catch(err){
                console.log(`bad url:${linkelement.href},\n ${err.message}`)
            }


    }
}
    return urls;
}



function normalizeURL(urlString){
    const urlOBJ = new URL(urlString);
    const hostpath = `${urlOBJ.hostname}${urlOBJ.pathname}`;
    if (hostpath.length > 0 && hostpath.slice(-1)==='/'){
        return hostpath.slice(0,-1);
    }

    return hostpath;
}

module.exports = {

    normalizeURL,
    getURLSfromHTML
}