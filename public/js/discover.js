 let searches = localStorage.getItem('searchHistory');
searches = searches ? JSON.parse(searches) : [];

// eslint-disable-next-line no-unused-vars
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 39.952583, lng: -75.165222 },
    });

    var input = document.getElementById('searchInput');
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        console.log({ place });
        searches.unshift(place.formatted_address);
        localStorage.setItem('searchHistory', JSON.stringify(searches));
        localStorage.setItem('place', place.formatted_address);
        if (!place.geometry) {
            var elem = document.querySelector('.modal');
            var instance = M.Modal.init(elem, {});
            instance.open();
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35),
        });
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] &&
                    place.address_components[0].short_name) ||
                '',
                (place.address_components[1] &&
                    place.address_components[1].short_name) ||
                '',
                (place.address_components[2] &&
                    place.address_components[2].short_name) ||
                '',
            ].join(' ');
        }

        infowindow.setContent(
            '<div><strong>' + place.name + '</strong><br>' + address
        );
        infowindow.open(map, marker);

        // Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i].types[0] === 'postal_code') {
                document.getElementById('postal_code').innerHTML =
                    place.address_components[i].long_name;
            }
            if (place.address_components[i].types[0] === 'country') {
                document.getElementById('country').innerHTML =
                    place.address_components[i].long_name;
            }
        }

    });
}
