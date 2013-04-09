var console = console||{info: function(){}};

$.fn.fieldCounter = function(opts){
    $(this).each(function(){
       $.fieldCounter.init($(this), opts);
    });
};

$.fieldCounter = {
    init: function(counter, opts){
        // Define the default option set.
        var defaultOpts = {
            counter: counter,
            field: null,
            limit: 0,
            format: '#count#/#limit# (#words# words)'
        };

        // Define the option set that is provided in the data attributes.
        var dataOpts = {};
        if (counter.data('field')){ dataOpts.field=$('#' + counter.data('field')); }
        if (counter.data('limit')){ dataOpts.limit=parseInt(counter.data('limit'),10); }
        if (counter.data('format')){ dataOpts.format=counter.data('format'); }

        // Build the opts so that they are overridden by the data attributes
        // provided in the individual field itself.  That way opts can act as
        // a universal setting, and individual fields can modify the universal
        // settings.
        opts = $.extend({}, defaultOpts, opts, dataOpts);
        var field = opts.field;

        // Store the settings in the field's data array.
        field.data('counter-data', opts);

        // Respond to a user typing in the field and recalculate the counts
        field.keyup(function(){
            var $this = $(this);
            var data = $this.data('counter-data');  // Retrieve the counter data
                                                    // from the data array
            var charCount = $this.val().length;

            if (data.limit > 0 && charCount > data.limit){
                $this.val($this.val().substr(0, data.limit));
                $.fieldCounter.updateCounter(field);
                return false;
            }

            $.fieldCounter.updateCounter(field);
        });

        $.fieldCounter.updateCounter(field);
    },

    updateCounter: function(field){
        // Update the counter on page display.
        var data = field.data('counter-data');
        var content = field.val();
        var charCount = content.length;
        var wordCount = content.replace(/[\-\,\\\:]+/g,' ')
                            .replace(/\.+/g, '')
                            .replace(/\s+/, ' ')
                            .split(' ').length;

        if (data.counter){
            var counterString = data.format.replace(/#count#/g, charCount)
                                    .replace(/#limit#/g, data.limit)
                                    .replace(/#words#/g, wordCount);
            data.counter.html(counterString);
        }
    }
};

$(document).ready(function(){
    $('.fieldCounter').fieldCounter();
});