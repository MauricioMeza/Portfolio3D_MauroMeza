$(document).ready(function(){
    //Gets the hash type of gallery from the link and passes it to the function
    var cond = $(location).attr('hash')
    if(cond){
        cond = cond.substring(1,cond.length)
    }else{
        cond = 'all'
    }
    console.log(cond)
    loadGallery(cond)
})

function loadGallery(condition){

    $.getJSON('./portfolio.json', data =>{
        //Load the id of the divs where gallery and modals are to be loaded and clears them
        var gal = $("#portfolio-gallery")
        var mod = $("#modals")
        gal.empty()
        //mod.empty()

        $(data).each((i, trabajo) => {
            var type;
            
            if(condition == 'all'){
                type = trabajo.tipo
            }else{
                type = condition
            }

            if(trabajo.tipo == type){
                
                var column = $(
                '<div class="col-sm-6 col-md-4 portfolio-item">' 
                    + '<a class="portfolio-link" data-toggle="modal" href="#portfolioModalmain" onclick="openModal(' + i +')">' 
                        + '<div class="portfolio-hover port-hover">' 
                            + '<div class="portfolio-hover-content">'
                                + '<i class="fa fa-plus fa-3x"></i>'
                            + '</div>'
                        + '</div>' 
                        + '<img class="img-fluid port-img" src="assets/img/port/' + trabajo.mainimg + '">'
                    +' </a>' 
                    +' <div class="portfolio-caption">'
                        +'<h4>' + trabajo.nombre + '</h4>' 
                        + '<p class="text-muted"><em>' + trabajo.tipo + '</em><br></p>'
                    + '</div>' 
                + '</div>')
                gal.append(column)
                

                /*
                var modal = $(
                    '<div class="modal fade portfolio-modal text-center" role="dialog" tabindex="-1" id="portfolioModal'+ i +'">'
                        + '<div class="modal-dialog modal-lg" role="document">'
                            + '<div class="modal-content content">'
                                + '<button class="btn btn-primary boton-cerrar" data-dismiss="modal" type="button"><i class="fa fa-times"></i><span>&nbsp;Cerrar</span></button>'
                                + '<div class="modal-body">'
                                    + '<div id="imgcarousel'+ i +'" class="carousel slide" data-ride="carousel">' +
                                        '<div class="carousel-inner">' +
                                            carousel +
                                        '</div>' +
                                        '<a class="carousel-control-prev" href="#imgcarousel' + i + '" role="button" data-slide="prev">' +
                                            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                                            '<span class="sr-only">Anterior</span>' +
                                        '</a>' +
                                        '<a class="carousel-control-next" href="#imgcarousel' + i + '" role="button" data-slide="next">' +
                                            '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                                            '<span class="sr-only">Siguiente</span>' +
                                        '</a>'
                                    + '</div>'
                                    + '<p class="project-info"> <b> Nombre: </b> '+ trabajo.nombre +' </p>'
                                    + '<p class="project-info"> <b> Tipo: </b> '+ trabajo.tipo +' </p>'
                                    + '<p class="project-info"> <b> Año: </b> '+ trabajo.fecha +' </p>'
                                    + '<p class="project-info"> <b> Info: </b> '+ trabajo.info +' </p>'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</div>')

                mod.append(modal)
                */
            }
        })
    })
}

function openModal(i){
    var carin = $("#carousel-innermain")
    carin.empty()
    $("#main-name").empty()
    $("#main-type").empty()
    $("#main-year").empty()
    $("#main-info").empty()

    $.getJSON('./portfolio.json', data =>{
        trabajo = data[i];

        var carousel = ''
        if(trabajo.tipo == "Animacion"){
            carousel += '<div class="carousel-item active">' +
                                '<iframe width="640" height="385" src="' + trabajo.video + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                            '</div>'        
        }else{
            carousel += trabajo.secondaryimgs.map((img, j) => {
                if(j == 0){
                    return '<div class="carousel-item active">' +
                            '<img class="img-fluid d-block mx-auto" src="assets/img/port/' + img + '" alt="img' + i + '">' +
                        '</div>'
                }else{
                    return '<div class="carousel-item">' +
                            '<img class="img-fluid d-block mx-auto" src="assets/img/port/' + img + '" alt="img' + i + '">' +
                        '</div>'                                   
                }
                    
            }).join(' ')
    
            if(trabajo.prev3d){
                carousel += '<div class="carousel-item">' +
                                '<iframe allowfullscreen webkitallowfullscreen width="100%" height="400" frameborder="0" seamless src="' + trabajo.prev3d +'"></iframe>' +
                            '</div>'
            }    
        }
        carin.append(carousel)

        $("#main-name").append('<b> Nombre: </b>'+ trabajo.nombre)
        $("#main-type").append('<b> Tipo: </b>'  + trabajo.tipo)
        $("#main-year").append('<b> Fecha: </b>' + trabajo.fecha)
        $("#main-info").append('<b> Info: </b>'  + trabajo.info)

    })       
}