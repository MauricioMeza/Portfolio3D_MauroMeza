$(document).ready(function(){
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
        var gal = $("#portfolio-gallery")
        var mod = $("#modals")

        gal.empty()
        mod.empty()

        $(data).each((i, trabajo) => {
            var type;
            
            if(condition == 'all'){
                type = trabajo.tipo
            }else{
                type = condition
            }

            if(trabajo.tipo == type){
                console.log(trabajo)
                var column = $(
                '<div class="col-sm-6 col-md-4 portfolio-item">' 
                    + '<a class="portfolio-link" data-toggle="modal" href="#portfolioModal'+ i +'">' 
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
                
                var carousel = ''
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
                                        + '<p class="project-info"> <b> Nombre: </b> '+ trabajo.nombre +' </p>'
                                        + '<p class="project-info"> <b> Tipo: </b> '+ trabajo.tipo +' </p>'
                                        + '<p class="project-info"> <b> Año: </b> '+ trabajo.fecha +' </p>'
                                        + '<p class="project-info"> <b> Info: </b> '+ trabajo.info +' </p>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</div>')

                mod.append(modal)
            }
        })

    })
}