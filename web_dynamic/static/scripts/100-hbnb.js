$(document).ready(function () {
    const checkedAmenities = {};
    const checkedStates = {};
    const checkedCities = {};
    $('input[type="checkbox"]').change(function() {
    let dataId = $(this).data('id');
    let dataName = $(this).data('name');
    let isChecked = $(this).is(':checked');

    // Determine the type of checkbox (state, city, or amenity)
    if (dataId.startsWith('State')) {
      if (isChecked) {
        selectedStates[dataId] = dataName;
      } else {
        delete selectedStates[dataId];
      }
    } else if (dataId.startsWith('City')) {
      if (isChecked) {
        selectedCities[dataId] = dataName;
      } else {
        delete selectedCities[dataId];
      }
    } else {
      // Assuming all other checkboxes are for amenities
      if (isChecked) {
        selectedAmenities[dataId] = dataName;
      } else {
        delete selectedAmenities[dataId];
      }
    }

    // Update the h4 tags with the lists of checked items
    let statesList = Object.values(selectedStates).join(', ');
    let citiesList = Object.values(selectedCities).join(', ');
    let amenitiesList = Object.values(selectedAmenities).join(', ');

    $('.locations h4').text(statesList + ', ' + citiesList);
    $('.amenities h4').text(amenitiesList);
  });
  
    // get api status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      $('#api_status').toggleClass('available', data.status === 'OK');
    });
  
    $('button').click(function () {
      const amenityIds = Object.keys(checkedAmenities);
      $.post({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: amenityIds }),
        success: function (data) {
          $('section.places').empty();
          data.forEach(function (place) {
            $('section.places').append(
                `<article>
                   <div class="title_box">
                     <h2>${place.name}</h2>
                     <div class="price_by_night">$${place.price_by_night}</div>
                   </div>
                   <div class="information">
                     <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                     <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                     <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                   </div>
                   <div class="description">${place.description}</div>
                 </article>`
            );
          });
        },
        error: function () {
          console.log('Error occurred during places search');
        }
      });
    });
    $('.filters > button').click(function () {
        $('.places > article').remove();
        $.ajax({
          type: 'POST',
          url: 'http://0.0.0.0:5001/api/v1/places_search',
          data: JSON.stringify({'amenities': Object.keys(checkedAmenities), 'states': Object.keys(checkedStates), 'cities': Object.keys(checkedCities)}),
          dataType: 'json',
          contentType: 'application/json',
          success: function (data) {
            for (let i = 0; i < data.length; i++) {
              let place = data[i];
              $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
            }
          }
        });
    });
});
