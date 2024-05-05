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
});
