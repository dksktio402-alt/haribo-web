// Flavor carousel: prev/next buttons scroll the track by one card width.
(function () {
  var track = document.getElementById('flavorTrack');
  var prevBtn = document.getElementById('flavorPrev');
  var nextBtn = document.getElementById('flavorNext');
  if (!track || !prevBtn || !nextBtn) return;

  function step() {
    var card = track.querySelector('.flavor-card');
    if (!card) return track.clientWidth;
    var style = getComputedStyle(track);
    var gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
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
