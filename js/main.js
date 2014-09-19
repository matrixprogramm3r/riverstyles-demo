(function($) {    
    var htmlEl = $(document).children().first();

    var UrlHelper = {
        getParameterByName: function(name) {
            console.log(window.location.href);
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
    };

    var pageData = {};

    $(document).on('pagecontainerbeforeshow', function(event, ui) {
        var pageId = ui.toPage.attr('id');

        console.log(ui);
        var url = $(this).data('url');
        console.log('url:', url);
        var id = UrlHelper.getParameterByName('id');
        /*var panelEl = htmlEl.find('div#nav-panel');
        panelEl.each(function(i, dom) {
            var panelEl = $(dom);
            var panelObj = panelEl.data('mq-ajaxpanel'); 
            panelEl.data('mq-ajaxpanel').open();
        });*/
    });
})(jQuery);
