/**
* Incase of docsify is on subdirectory and on hash mode
* Custom script to handle invalid asset link
* from absolute `/asset/...` to relative `asset/..`
* like `localhost/docs/midtrans-alt-doc/#/`
*/
(function replaceAbsoluteResourceWithRelative(){
    // check if this script is loaded `/asset/absolute-to-relative-check.js``
    if (!window.absoluteResourceLoaded){
        var originalHtml = '';
        var currentUrlPath = document.location.origin + document.location.pathname;
        // ajax fetch original html
        fetch(document.location.href)
            .then(function (response){ 
                return response.text() 
            })
            .then(function(response){
                originalHtml = response
                // replace absolute assets path to relative
                var modifiedHtml = originalHtml
                    .replace(/("|')\/asset\//gm,'$1./asset/')
                    // add docsify config to change basepath
                    // .replace('// basePath: "/",','basePath: "'+currentUrlPath+'",');
                console.log('---- Relative path detected, replacing HTML')
                // soft reload page to flush window JS/dom state
                window.location.reload(false);
                // replace page with new modifiedHtml
                document.open();
                document.write(modifiedHtml);
                document.close();
            })
    }
})();