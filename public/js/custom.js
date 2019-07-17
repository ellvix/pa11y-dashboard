
$(document).ready(function() {
    AddNewButton();
});

function AddNewButton() {
    var html = '';
    html += '<li class="col-md-4 col-sm-6 task-card">\n';
    html += '<div class="well task-card-link crunch-bottom" id="run_all_tests" role="button">\n';
    html += '<p class="h3">Run All Sites</p>\n';
    html += '<p class="h5">Warning, this will spam tabs. Make sure popups will open.</p>\n';
    html += '</div>\n';
    html += '</li>\n';

    $('li').first().after(html);

    $('#run_all_tests').click(function() {
        RunAllTests();
    });
}

function RunAllTests() {
    $('li.task-card[data-role="task"]').each(function() {
        var url = $(this).find('ul[role="menu"] > li:last-child > a').attr('href');
        window.open(url, '');
        //console.log(`will open ${url}`);
    });
}
