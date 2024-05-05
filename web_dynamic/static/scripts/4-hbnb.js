$(document).ready(function () {
  const checkedAmenities = {};
  $('li input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenities[this.dataset.id] = this.dataset.name;
    } else {
      delete checkedAmenities[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(checkedAmenities).sort().join(', '));
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
});
