define([], function() {
    var $ = require("jQuery");
    var hr = require("hr/hr");
    var box = require("core/box");
    var search = require("core/search");

    //Add codebox search handler
    search.handler({
        'id': "stackoverflow",
        'title': "Stackoverflow"
    }, function(q) {
        return hr.Requests.getJSON("https://api.stackexchange.com/2.1/search?order=desc&sort=votes&intitle="+q+"&site=stackoverflow&callback=?").then(function(data) {
            return _.map(data.items, function(result) {
                return {
                    "text": result.title,
                    "callback": _.bind(function() {
                        window.open(result.link);
                    }, this)
                };
            });
        });
    });
});