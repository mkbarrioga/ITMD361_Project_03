function initMap(){
  var options = {
    zoom:10,
    center:{lat:41.9428858, lng:-87.8285725}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);

  function addMarker(attrib){
    var marker = new google.maps.Marker({
      position:attrib.coords,
      map:map
    });

    if(attrib.iconImage){
      marker.setIcon(attrib.iconImage);
    }

    if(attrib.content){
      var infoWindow = new google.maps.InfoWindow({
        content:attrib.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
        document.getElementById('captions').innerHTML = attrib.content;
      });
    }

    if(attrib.animation){
      marker.setAnimation(attrib.animation);
    }
  }
  
  addMarker({
    coords:{lat:41.8314798,lng:-87.6283148},
    iconImage:'images/customIcon.PNG',
    content:'<p>Illinois Institute of Technology</p>',
    animation: google.maps.Animation.BOUNCE
    });

  addMarker({
    coords:{lat:41.9876626,lng:-87.6545129},
    iconImage:'images/beach.PNG',
    content:'<p>Kathy Osterman Beach</p>'
  });

  addMarker({
    coords:{lat:41.8663134,lng:-87.6070143},
    iconImage:'images/museum.PNG',
    content:'<p>Adler Planetarium</p>'
  });

  addMarker({
    coords:{lat:41.9133549,lng:-87.6692455},
    iconImage:'images/bike.PNG',
    content:'<p>The 606 - East Trailhead</p>'
  });

  addMarker({
    coords:{lat:41.9135389,lng:-87.71964},
    iconImage:'images/bike.PNG',
    content:'<p>The 606 - West Trailhead</p>'
  });

  addMarker({
    coords:{lat:41.8479033,lng:-88.0394595},
    iconImage:'images/food.PNG',
    content:'<p>Blue Sushi Sake Grill</p>'
  });

  addMarker({
    coords:{lat:42.185524,lng:-87.8007389},
    iconImage:'images/food.PNG',
    content:'<p>Sweet Home Gelato Highland Park</p>'
  });
}