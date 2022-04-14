function initMap(){
  var options = {
    zoom:12,
    center:{lat:41.8089, lng:-88.0112}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);
}