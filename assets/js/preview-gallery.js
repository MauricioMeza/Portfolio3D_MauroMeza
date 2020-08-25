$(document).ready(function(){

    var cond = $(location).attr('pathname')
    var english = cond.includes('en')

    if(english){
        var preview = $("#prt-prev-en")
    }else{
        var preview = $("#prt-prev")
    }
    

    $.getJSON('./portfolio.json', data =>{
        var previews = []
        $(data).each((i, trabajo) => {
            var n
            (english)? n = trabajo.name : n = trabajo.nombre
            if(trabajo.front){
                var item =  '<div class="col-sm-6 col-md-4 portfolio-item">' + 
                                '<a class="portfolio-link" data-toggle="modal" href="#portfolioModalmain" onclick="openModal('+ i +', '+ english +')">' +
                                    '<div class="portfolio-hover port-hover">' +
                                        '<div class="portfolio-hover-content"><i class="fa fa-plus fa-3x"></i></div>' +
                                    '</div>' +
                                    '<img class="img-fluid port-img" src="assets/img/port/' + trabajo.mainimg +'">' +
                                '</a>' +
                                '<div class="portfolio-caption">' +
                                    '<h4>' + n +' </h4>' +
                                    '<p class="text-muted">'+ trabajo.tipo +'</p>' +
                                '</div>' +
                            '</div>'

                previews[trabajo.front] = item;
            }
        })
        previews.forEach(element => {
            preview.append(element)    
        });
    })
})