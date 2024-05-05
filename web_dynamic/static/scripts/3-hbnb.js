$(document).ready(function () {
    const checkedAmenities = {};
    $('li input[type="checkbox"]').change(function () {
        if (this.checked) {
            checkedAmenities[this.dataset.id] = this.dataset.name;
        } else {
            delete checkedAmenities[this.dataset.id];
        }
        $('.amenities h4').text(Object.values(checkedAmenities).sort().jo(', '));
    });
});

$(document).ready(function() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        $('#api_status').toggleClass('available', data.status === 'OK');
    });
});

$(document).ready(function() {
    $.post({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: '{}',
        success: function (response) {
            for (const place of response) {
                const article = $('<article></article>');
                article.append('<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
                article.append('<div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div></div>');
                article.append('<div class="description">' + place.description + '</div>');
                $('.places').append(article);
            }
        },
        error: function () {
            console.log('Error occurred during places search');
        }
    });
});