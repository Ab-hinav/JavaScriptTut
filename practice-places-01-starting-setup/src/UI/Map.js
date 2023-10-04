export class Map{

    constructor(cords){       
        this.render(cords);
    }

    render(cordinates){

        if (!google){
            alert('maps not loaded');
            return;
        }
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: cordinates
          });
        new google.maps.Marker({
            position: cordinates,
            map,
            title: "My location"
          });
    }

}