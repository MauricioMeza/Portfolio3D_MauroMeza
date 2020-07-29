$(document).ready(function () {
    $.getJSON('./portfolio.json', data =>{
        console.log(data)

        $(data).each((i, trabajo) => {
            console.log(trabajo)
            var col = $('<div class="col-sm-6 col-md-4 portfolio-item"> <a class="portfolio-link" data-toggle="modal" href="#portfolioModal6"> <div class="portfolio-hover port-hover"> <div class="portfolio-hover-content"> <i class="fa fa-plus fa-3x"></i> </div> </div> <img class="img-fluid" src="../assets/img/p/' + trabajo.mainimg + '"> </a> <div class="portfolio-caption"> <h4>' + trabajo.nombre + '</h4> <p class="text-muted"><em>' + trabajo.tipo + '</em><br></p> </div> </div>')
            $("#portfolio-gallery").append(col)
        })


    })
})