define([], function() {
    var $ = require("jQuery");
    var hr = require("hr/hr");
    var box = require("core/box");
    var search = require("core/search");

    // Execute the search using http proxy from codebox
    var searchQuestions = function(q, callback) {
        $.get(box.proxyUrl("https://api.stackexchange.com/2.1/search?order=desc&sort=votes&intitle="+q+"&site=stackoverflow"), callback);
    };

    //Add codebox search handler
    search.handler({
        'id': "stackoverflow",
        'title': "Stackoverflow"
    }, function(query) {
        var d = new hr.Deferred();
        searchQuestions(query, function(data) {
            d.resolve(_.map(data.items, _.bind(function(result) {
                return {
                    "text": result.title,
                    "callback": _.bind(function() {
                        window.open(result.link);
                    }, this)
                };
            })));
        });
        return d;
    });
});