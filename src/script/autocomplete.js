'use strict';

var autocomplete = (container) => {
    const element = container.querySelector('.autocomplete-field');
    const dropdown = document.createElement('ol');

    dropdown.classList.add('autocomplete-list');
    dropdown.classList.add('hide');
    container.appendChild(dropdown);

    // const NO_ENTRIES_TEXT = 'No suggestions',
    const ENTER_MORE_TEXT = 'Type and we\'ll make suggestions...';
        // INPUT_LENGTH_THRESHOLD = 3;
        // AUTOCOMPLETE_URL = 'http://localhost:8080/suggestion.php',
        // AUTOCOMPLETE_OPTIONS = {
        //     q: '',
        // };

    var callTimer,
        cur = -1;

    const addItem = (text, url) => {
        let item, itemlink;

        item = document.createElement('li');

        if (url) {
            itemlink = document.createElement('a');
            itemlink.setAttribute('href', url);
        }

        else {
            itemlink = document.createElement('span');
        }

        itemlink.innerHTML = text;
        item.appendChild(itemlink);
        dropdown.appendChild(item);
    };

    const resetDropdown = () => {
        dropdown.innerHTML = '';
        addItem(ENTER_MORE_TEXT);
    };

    const hideDropdown = () => {
        dropdown.classList.add('hide');
    };

    const downloadAndPopulateResults = () => {
        // var val = element.value;

        dropdown.innerHTML = '';

        addItem('Some Text', 'someurl');
        addItem('Some Text', 'someurl');
        addItem('Some Text', 'someurl');
        return;


        // AUTOCOMPLETE_OPTIONS.q = val;
        // if (val.length > INPUT_LENGTH_THRESHOLD) {
        //     $.ajax({url: AUTOCOMPLETE_URL, data: AUTOCOMPLETE_OPTIONS, method: 'get'})
        // .done(response => {
        //     dropdown.innerHTML = '';

        //       // If we were successful in getting a response from the server via AJAX,
        //       // parse the response and call addItem on each element in the response.
        //     if (response) {
        //         var resp = JSON.parse(response);
        //         for (var i = 0; i < resp.length; i++) {
        //             addItem(resp[i].value, 'http://wayfair.com/filters/redir=' + resp[i].value);
        //         }
        //     }
        //     else {
        //         addItem(NO_ENTRIES_TEXT);
        //     }
        // });
        // }
    };

    const doOnFocus = () => {
        dropdown.classList.remove('hide');
        resetDropdown();
    };

    const doOnBlur = () => {
        hideDropdown();
    };

    const doOnKeyup = (ev) => {
        if (ev.keyCode < 32) {
            return;
        }

        else {
            clearTimeout(callTimer);
            callTimer = setTimeout(downloadAndPopulateResults, 200);
        }
    };

    const doOnKeyDown = (ev) => {
        var isCursorMoved = false;

        switch(ev.keyCode) {
        case 40: // DOWN ARROW
            isCursorMoved = true;
            cur++;
            if (cur > dropdown.childNodes.length - 1) {
                cur = 0;
            }

            ev.preventDefault();
            break;

        case 38: // UP ARROW
            isCursorMoved = true;
            cur--;

            if (cur < 0) {
                cur = dropdown.childNodes.length - 1;
            }

            ev.preventDefault();
            break;

        case 13: // Enter
            ev.preventDefault();
            break;

        default:
            break;
        }

        if (isCursorMoved) {
            if (dropdown.getElementsByClassName('selected').length > 0) {
                dropdown.getElementsByClassName('selected')[0].classList.remove('selected');
            }

            dropdown.childNodes[cur].childNodes[0].classList.add('selected');

            element.value = dropdown.querySelector('.selected').innerHTML;
        }
    };

    element.addEventListener('focus', doOnFocus.bind(this));
    element.addEventListener('blur', doOnBlur.bind(this));
    element.addEventListener('keyup', doOnKeyup.bind(this));
    element.addEventListener('keydown', doOnKeyDown.bind(this));
};


export { autocomplete };