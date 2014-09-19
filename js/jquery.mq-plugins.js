(function($) {    
    var Partial = function(config) {
        this.el = config.el;
        config = this.defaults(config);
        this.base_template_path = config.base_template_path;
        this.template = config.template;

        if (config.action == 'load') {
            this.load(config.data, config.handler);
        } 
    };
    Partial.prototype.defaults = function(config) {
        var defaults = {
            action: 'load',
            base_template_path: 'templates/',
            template: false,
            data: {},
            handler: false
        };

        return $.extend(defaults, config); 
    };
    Partial.prototype.load = function(data, handler) {
        if (!this.template) throw 'Template 404';

        var url = this.base_template_path + this.template;
        var args = [ url ];
        if (typeof handler == 'function') args.push(handler);

        console.log(args);

        this.el.load(url, handler);
    };
    $.fn.mqPartial = function(config) {
        if (typeof config == 'load')
            config = { action: 'load' };
        else if (typeof config == 'undefined') 
            config = {};
    
        for (var i = 0; i < this.length; i++) {
            config.el = $(this);
            var data = config.el.data('mq-partial');
            if (typeof data == 'undefined') {
                data = new Partial(config);
                config.el.data('my-partial', data);
            }
        }
    };

    $.widget( "mq.ajaxpanel", $.mobile.panel, {
        _create: function() {
            this._super();

            var self = this;
            this.element.mqPartial({
                template: this.element.attr('data-template'),
                handler: function() {
                    self.element.enhanceWithin();                    
                }
            });
        }
    });
})(jQuery);
