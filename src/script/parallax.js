
//////////////////////////
// Parallax Effect
'use strict';

var elementMoveFunc = [];

// TODO: Move things to global space as this doens't work as a component.

const parallax = (els) => {
  var isScrolling = false,
  eventsToHandle = ['scroll', 'touchstart', 'touchend', 'touchmove'],
  elementMoveFunc = [];

  const movemove = (el) => {
    var speed = parseFloat(el.getAttribute('data-parallax-speed')) * -1,
    prop = el.getAttribute('data-parallax-property') || 'top',
    startPoint = parseFloat(el.getAttribute('data-parallax-startat')) || 0,
    stopPoint = parseFloat(el.getAttribute('data-parallax-stopat') || 10000),
    isCanvas = el.nodeName === 'CANVAS',
    initial = parseFloat(window.getComputedStyle(el)[prop]);

    if (isCanvas) {
      return function(offset) {
        if ((offset >= startPoint) && (offset < stopPoint)) {
          if (this.getAttribute('data-animating') !== '1') {
            this.setAttribute('data-animating', '1');
            this.dispatchEvent(new Event('start'));
          }
          else {
            this.dispatchEvent(new CustomEvent('update', {detail: offset}));
          }
        }
        if ((offset >= stopPoint) && (this.getAttribute('data-animating') === '1')) {
          this.setAttribute('data-animating', '0');
          this.dispatchEvent(new Event('cancel'));
        }
      }
    }
    else {
      return function(offset) {
        if ((offset >= startPoint) && (offset < stopPoint)) {
          console.log(this, this.style[prop]);
          this.style[prop] = (((offset - startPoint) * speed) + initial) + 'px';
        }
      }
    }
  };


  const resetFlag = () => {
    isScrolling = false;
  };

  const animate = () => {
    if (isScrolling) {
      console.log(elementMoveFunc);
      elementMoveFunc.forEach(function(e, i) {
        e.call(els[i], window.scrollY);
      });

      setTimeout(resetFlag, 10);
    }
    window.requestAnimationFrame(animate);
  };

  els.forEach(function(el) {
    console.log(el);
    elementMoveFunc.push(movemove(el));
  });

  eventsToHandle.forEach(function(e) {
    window.addEventListener(e, function(ev) {
      isScrolling = true;
    });
  });

  window.requestAnimationFrame(animate);
};

export { parallax };
