/* ============================================================
   X-MEN '97 — Sound effects (Web Audio API) + typing speed up
   ============================================================ */

(function() {
  'use strict';

  /* ── Speed up typing animation ── */
  if (typeof TxtRotate !== 'undefined') {
    TxtRotate.prototype.tick = function() {
      var t = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[t];
      this.txt = this.isDeleting
        ? fullTxt.substring(0, this.txt.length - 1)
        : fullTxt.substring(0, this.txt.length + 1);
      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
      var that = this;
      var delta = 120 - 60 * Math.random();
      if (this.isDeleting) delta /= 3;
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 300;
      }
      setTimeout(function() { that.tick(); }, delta);
    };
  }

  var audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playNote(frequency, startTime, duration, type, volume) {
    var ctx = getAudioContext();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    osc.type = type || 'sawtooth';
    gain.gain.setValueAtTime(volume || 0.08, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  function playXmenArpeggio() {
    var ctx = getAudioContext();
    var now = ctx.currentTime;
    var notes = [
      { freq: 261.63, type: 'square', vol: 0.06 },
      { freq: 311.13, type: 'square', vol: 0.06 },
      { freq: 392.00, type: 'square', vol: 0.06 },
      { freq: 523.25, type: 'square', vol: 0.06 },
      { freq: 392.00, type: 'triangle', vol: 0.07 },
      { freq: 311.13, type: 'triangle', vol: 0.07 },
      { freq: 261.63, type: 'triangle', vol: 0.07 },
    ];
    var noteDuration = 0.15;
    notes.forEach(function(note, i) {
      playNote(note.freq, now + i * noteDuration, noteDuration, note.type, note.vol);
    });
    playNote(659.25, now + notes.length * noteDuration, 0.3, 'sine', 0.04);
  }

  window.addEventListener('load', function() {
    setTimeout(playXmenArpeggio, 1800);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var socialLinks = document.querySelectorAll('.landing-icons .social-link, .contact-icons .social-link');
    socialLinks.forEach(function(link) {
      link.addEventListener('mouseenter', function() {
        var ctx = getAudioContext();
        var now = ctx.currentTime;
        var pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        var freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        playNote(freq, now, 0.08, 'sine', 0.03);
      });
    });
  });

})();
