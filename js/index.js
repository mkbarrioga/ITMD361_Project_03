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

    if(attrib.content && attrib.message){
      var infoWindow = new google.maps.InfoWindow({
        content:attrib.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
        document.getElementById('markerTitle').innerHTML = attrib.content;
        document.getElementById('captions').innerHTML = attrib.message;
      });
    }

    if(attrib.animation){
      marker.setAnimation(attrib.animation);
    }
  }

  var markers = [
    {
      coords:{lat:41.8314798,lng:-87.6283148},
      iconImage:'/ITMD361_Project_03/images/customIcon.PNG',
      content:'<p>Illinois Institute of Technology</p>',
      animation: google.maps.Animation.BOUNCE,
      message: 'This is where I currently attend for a degree on Information Technology and Management.'
    },
    {
      coords:{lat:41.9876626,lng:-87.6545129},
      iconImage:'/ITMD361_Project_03/images/beach.PNG',
      content:'<p>Kathy Osterman Beach</p>',
      message: 'It is also called Hollywood Beach by locals. I spend times here to take my dog for a walk, read, or mostly just feel the sand on my feet.'
    },
    {
      coords:{lat:41.8663134,lng:-87.6070143},
      iconImage:'/ITMD361_Project_03/images/museum.PNG',
      content:'<p>Adler Planetarium</p>',
      message: 'This is one of my favorite museums in Chicago. I love their SkyWatch events. It is a theather where you can sit all the way back with a screen projected through its dome roofing to give guests a 180degree view of the show. It feels as if I am in a spaceship.'
    },
    {
      coords:{lat:41.9133549,lng:-87.6692455},
      iconImage:'/ITMD361_Project_03/images/bike.PNG',
      content:'<p>The 606 - East Trailhead</p>',
      message: 'This place is the starting point when I plan on taking what is known as Bloomingdle Trail. It used to be a railroad called the 606 but now its a trail that I recommend to be visited when in Chicago as it is close to Wicker Park if one chooses to have fun and leisure.'
    },
    {
      coords:{lat:41.9135389,lng:-87.71964},
      iconImage:'/ITMD361_Project_03/images/bike.PNG',
      content:'<p>The 606 - West Trailhead</p>',
      message: 'This is the west end of Bloomingdale Trail. It has a beautiful scenery as it is elevated so people can enjoy a 360 view of the neighborhood.'
    },
    {
      coords:{lat:41.8479033,lng:-88.0394595},
      iconImage:'/ITMD361_Project_03/images/food.PNG',
      content:'<p>Blue Sushi Sake Grill</p>',
      message: 'One of my favorite restaurants to visit whenever I am craving for a sushi. I recommend their Maki which is called Thriller.'
    },
    {
      coords:{lat:42.185524,lng:-87.8007389},
      iconImage:'/ITMD361_Project_03/images/food.PNG',
      content:'<p>Sweet Home Gelato Highland Park</p>',
      message: 'This is one of the shops in Highland Park that I would treat myself with if I am to bike total of 70miles in a nice afternoon. I surely deserve a gelato after reaching halfway of the trip.'
    }
  ];

  for(var i=0; i<markers.length; i++){
    addMarker(markers[i]);
  }

  new AutocompleteDirectionsHandler(map);
}

class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const modeSelector = document.getElementById("mode-selector");
    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );
    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}

window.initMap = initMap;