$(document).ready(function(){
    //Gets the hash type of gallery from the link and passes it to the function
    var cond = $(location).attr('hash')
    var eng = $(location).attr('pathname')
    eng = eng.includes('en')
    

    if(cond){
        cond = cond.substring(1,cond.length)
    }else{
        cond = 'all'
    }
    console.log(cond)
    loadGallery(cond, eng)
})

function loadGallery(condition, eng){
    $.getJSON('./portfolio.json', data =>{
        //Load the id of the divs where gallery and modals are to be loaded and clears them
        var gal = $("#portfolio-gallery")
        gal.empty()
        

        $(data).each((i, trabajo) => {
            var type;
            
            //Only generate gellery preview from the condition of the type
            if(condition == 'all'){
                type = trabajo.tipo
            }else{
                type = condition
            }

            var n
            (eng)? n = trabajo.name : n = trabajo.nombre

            if(trabajo.tipo == type){
                //Generate gallery preview and append it as a bootstrap column
                var column = $(
                '<div class="col-sm-6 col-md-4 portfolio-item">' 
                    + '<a class="portfolio-link" data-toggle="modal" href="#portfolioModalmain" onclick="openModal(' + i +',' + eng + ')">' 
                        + '<div class="portfolio-hover port-hover">' 
                            + '<div class="portfolio-hover-content">'
                                + '<i class="fa fa-plus fa-3x"></i>'
                            + '</div>'
                        + '</div>' 
                        + '<img class="img-fluid port-img" src="assets/img/port/' + trabajo.mainimg + '">'
                    +' </a>' 
                    +' <div class="portfolio-caption">'
                        +'<h4>' + n + '</h4>' 
                        + '<p class="text-muted"><em>' + trabajo.tipo + '</em><br></p>'
                    + '</div>' 
                + '</div>')
                gal.append(column)
            }
        })
    })
}