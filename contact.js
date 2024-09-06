function initMap() {
    var centre1 = {
        info:
            '<div class="address_popup_on_map"> <strong>Rockingham</strong><br><br>\
              Unit 15<br>\
              3 Benjamin Way<br>\
              Rockingham WA 6168</div>',
        lat: -32.28141,
        long: 115.78687
    };
    var centre2 = {
        info:
            '<div class="address_popup_on_map"> <strong>Belmont/Maddington</strong><br><br>\
              Unit 7<br>\
              13 Blackburn Street<br>\
              Maddington WA 6109</div>',
        lat: -32.0513,
        long: 115.97982
    };
    var centre3 = {
        info:
            '<div class="address_popup_on_map"> <strong>Mandurah</strong><br><br>\
              2 Elizabeth Street<br>\
              Mandurah WA 6210</div>',
        lat: -32.531611,
        long: 115.732886

    };

    var centre4 = {
        info:
            '<div class="address_popup_on_map"> <strong>Central Office</strong><br><br>\
              Unit 10<br>\
              213 Wright Street,<br>\
              Cloverdale WA 6105</div>',
        lat: -31.96289613685004,
        long: 115.93415740449477
    };

    var centre5 = {
        info:
            '<div class="address_popup_on_map"> <strong>Myaree/Spearwood</strong><br><br>\
              Suite 9<br>\
              Hulme House<br>\
              32 Hulme Court<br>\
              Myaree WA 6154</div>',
        lat: -32.045127,
        long: 115.812568
    };

    var centre7 = {
        info:
            '<div class="address_popup_on_map"> <strong>Midland/Osborne Park</strong><br><br>\
              6B, Blades Close<br>\
              Morley WA 6062</div>',
        lat: -31.90022,
        long: 115.82775
    };

    var locations = [
        [centre1.info, centre1.lat, centre1.long, 0],
        [centre2.info, centre2.lat, centre2.long, 1],
        [centre3.info, centre3.lat, centre3.long, 2],
        [centre4.info, centre4.lat, centre4.long, 2],
        [centre5.info, centre5.lat, centre5.long, 4],
        [centre7.info, centre7.lat, centre7.long, 6]
    ];
    var Cannington = {lat: -32.060360, lng: 115.933648};
    var image = {
        url: '/wp-content/themes/interchange/images/map_marker.png',
        scaledSize : new google.maps.Size(120, 120)
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: Cannington
    });
    var infowindow = new google.maps.InfoWindow({});

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: image
        });
        google.maps.event.addListener(
            marker,
            'click',
            (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )

    }
}