// Flavor carousel: prev/next buttons scroll the track by one card width.
(function () {
  var track = document.getElementById('flavorTrack');
  var prevBtn = document.getElementById('flavorPrev');
  var nextBtn = document.getElementById('flavorNext');
  if (!track || !prevBtn || !nextBtn) return;

  // Distance between two neighbouring cards, measured in the track's own
  // coordinate space (same units as scrollLeft). getBoundingClientRect() and
  // getComputedStyle() disagree under CSS zoom, so don't mix them.
  function step() {
    var cards = track.querySelectorAll('.flavor-card');
    if (cards.length < 2) return track.clientWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }

  function updateArrows() {
    var maxScroll = track.scrollWidth - track.clientWidth - 1;
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = track.scrollLeft >= maxScroll;
  }

  prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();
})();
