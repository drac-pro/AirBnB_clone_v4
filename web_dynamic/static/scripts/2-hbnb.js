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
  });

const apiStatusDiv = $('#api_status');

$.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    datatype: 'json',
    success: function (data) {
        if (data.status === 'OK') {
            apiStatusDiv.addClass('available');
        } else {
            apiStatusDiv.removeClass('available');
        }
    },
    error: function (xhr, status) {
        console.log('error' + status);
        apiStatusDiv.removeClass('available');
    }
});