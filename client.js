define([], function() {
    var $ = codebox.require("jQuery");
    var hr = codebox.require("hr/hr");
    var box = codebox.require("core/box");
    var search = codebox.require("core/search");

    //Add codebox search handler
    search.handler({
        'id': "stackoverflow",
        'title': "Stackoverflow"
    }, function(q) {
        return hr.Requests.getJSON("https://api.stackexchange.com/2.1/search?order=desc&sort=votes&intitle="+q+"&site=stackoverflow&callback=?").then(function(data) {
            return _.map(data.items, function(result) {
                return {
                    "title": $("<div>").html(result.title).text(),
                    "icons": {
                        'search': "stack-overflow"
                    },
                    "action": _.bind(function() {
                        window.open(result.link);
                    }, this)
                };
            });
        });
    });
});