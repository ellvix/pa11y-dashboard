
/* 
 * idea for this script:
 * We want to hit the 'run site' link on all sites.
 * So let's do it automatically with ajax.
 * And add a trigger button and some UI while we're at it
 *
*/

'use strict';

$(document).ready(function() {
    AddNewButton();
});

// add trigger button to the page
function AddNewButton() {
    var html = '';
    html += '<li class="col-md-4 col-sm-6 task-card">\n';
    html += '<div class="well task-card-link crunch-bottom" id="run_all_tests" role="button">\n';
    html += '<p class="h3">Run All Sites</p>\n';
    html += '<p class="h5" id="in_progress_wrapper"></p>\n';
    html += '</div>\n';
    html += '</li>\n';

    $('li').first().after(html);

    $('#run_all_tests').click(function() {
        RunAllTests();
    });
}

// find all the 'run test' links, 'click' them by hitting an ajax request, and update the UI
function RunAllTests() {
    $('li.task-card[data-role="task"]').each(function() {
        var name = $(this).find('a > p:first-child').html();
        var url = $(this).find('ul[role="menu"] > li:last-child > a').attr('href');

        AddToVisualQueue(name);

        $.ajax({
            url: url,
            complete: function(r) {
                //console.log(r);
                UpdateCount();
            }
        });
    });
}

// Update UI, add 
function AddToVisualQueue(name) {
    if ( $('#in_progress').length > 0 ) {
        var count = Number($('#in_progress').html());
        if ( isNaN(count) ) {
            count = 0;
        }
    } else {
        // UI is blank initially, add it
        $('#in_progress_wrapper').html('In Progress... (<span id="in_progress">0</span>)');
        count = 0;
    }

    count++;

    // update UI counter
    $('#in_progress').html(count);
}

// Update UI, decrease counter, or remove UI altogether if we're done
function UpdateCount() {
    var count = Number($('#in_progress').html()) - 1;

    if ( count < 1 ) {
        $('#in_progress_wrapper').html('Done');
    } else {
        $('#in_progress').html(count);
    }
}

