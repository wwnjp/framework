'use strict';

const modal = (container) => {
  const doc = document;
  const body = doc.body;
  const overlay = document.createElement('div');
  const modal = container;

  overlay.classList.add('modal-overlay');
  body.appendChild(overlay);

  // Helper function to parse JSON that's defined in a Data Attr.
  const parseJSONParam = (j) => {
    var ret = {}, params = j.split(",");

    for (var i = 0; i < params.length; i++) {
      curr = params[i].split(':', 2);
      ret[curr[0].trim()] = curr[1].replace(/'/g, '').trim();
    }

    return ret;
  };

  const modalClose = () => {
    var $modal = $(".modal.active"),
    $modalOverlay = $(".modal-overlay.active");

    if ($modal.size() > 0) {
      $("body").removeClass("modal-active");
      $modal.removeClass('active');
      $modalOverlay.removeClass('active');

      setTimeout(function() {
        $modalOverlay.removeClass('ready');
        $modal.removeClass('ready');
      }, 500);
    }
  };


  // Binding global "Close any open Modal"
  document.addEventListener('modal-close', modalClose.bind(this));


  // return this.each(function() {
  //   var opt = parseJSONParam($(this).data('modal')),
  //   $modal = $(this),
  //   $modalOverlay = $("<div></div>").addClass('modal-overlay').appendTo('body');
  //
  //   modalShowFunc = function() {
  //     body.classList.add('modal-active');
  //     overlay.classList.add('ready');
  //     modal.classList.add('ready');
  //
  //     document.dispatchEvent(new Event('modal-close'));
  //
  //     setTimeout(function() {
  //       overlay.classList.add('active');
  //       modal.classList.add('active');
  //     }, 250);
  //
  //     // Force the window to the top to show.
  //     window.scrollTo(0, 0);
  //   };
  //
  //
  //   if (opt.trigger) {
  //     $modal.attr('id', 'modal-' + opt.trigger).appendTo($modalOverlay).first();
  //     $modal.find(".modal-close").on('click', modalCloseFunc.bind(this));
  //     $(document).on('modal-' + opt.trigger, modalShowFunc.bind(this));
  //   }
  // }
};

export { modal };
