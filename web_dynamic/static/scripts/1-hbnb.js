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
