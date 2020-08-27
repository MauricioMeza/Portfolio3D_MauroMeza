function openModal(i, en){
    //Empty previous information in modal
    var carin = $("#carousel-innermain")
    carin.empty()
    $("#main-name").empty()
    $("#main-type").empty()
    $("#main-year").empty()
    $("#main-info").empty()

    //Get information from JSON File of selected work
    $.getJSON('./portfolio.json', data =>{
        trabajo = data[i];

        //Generate carousel items from main videos, main images, secindary imgs and 3D previews
        var carousel = ''
        var multiple = false
        if(trabajo.tipo == "Animacion"){
            carousel += '<div class="carousel-item active">' +
                            '<div class="video-item">' +
                                '<iframe src="' + trabajo.video + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                            '</div>' +
                        '</div>'        
        }else{
            carousel += trabajo.secondaryimgs.map((img, j) => {
                if(j == 0){
                    return  '<div class="carousel-item active">' +
                                '<div class="resnponsive-video">' +
                                    '<img class="img-fluid d-block mx-auto" src="assets/img/port/' + img + '" alt="img' + i + '">' +
                               '</div>' +
                            '</div>'
                }else{
                    multiple = true;
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

        //Different text deppending on english or spanish version
        if(en){
            $("#main-name").append('<b> Name: </b>'+ trabajo.name)
            $("#main-type").append('<b> Type: </b>'  + trabajo.tipo)
            $("#main-year").append('<b> Year: </b>' + trabajo.fecha)
            $("#main-info").append('<b> Info: </b>'  + trabajo.info)
        }else{
            $("#main-name").append('<b> Nombre: </b>'+ trabajo.nombre)
            $("#main-type").append('<b> Tipo: </b>'  + trabajo.tipo)
            $("#main-year").append('<b> Fecha: </b>' + trabajo.fecha)
            $("#main-info").append('<b> Info: </b>'  + trabajo.info)
        }
        

    })       
}