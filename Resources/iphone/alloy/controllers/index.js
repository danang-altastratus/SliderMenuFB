function Controller() {
    function createSection() {
        var section = Ti.UI.createTableViewSection();
        var customView = Ti.UI.createView({
            height: 0
        });
        var menuData = [ {
            title: "News",
            icon: "/ds.slideMenu/news-icon.png"
        }, {
            title: "Events",
            icon: "/ds.slideMenu/events-icon.png"
        }, {
            title: "Stories",
            icon: "/ds.slideMenu/stories-icon.png"
        }, {
            title: "Media Gallery",
            icon: "/ds.slideMenu/media-gallery-icon.png"
        }, {
            title: "About Us",
            icon: "/ds.slideMenu/about-us-icon.png"
        } ];
        section.headerView = customView;
        for (var j = 0; menuData.length > j; j++) {
            var args = {
                title: "Line " + j,
                customView: "view" + j
            };
            section.add(Alloy.createController("menurow", args).getView());
        }
        return section;
    }
    function rowSelect(e) {
        if (currentView.id != e.row.customView) {
            $.ds.contentview.remove(currentView);
            currentView = Alloy.createController(e.row.customView).getView();
            $.ds.contentview.add(currentView);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        navBarHidden: true,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.ds = Alloy.createWidget("ds.slideMenu", "widget", {
        id: "ds",
        __parentSymbol: $.__views.win
    });
    $.__views.ds.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var leftData = [];
    for (var i = 0; 1 > i; i++) leftData[i] = createSection();
    $.ds.leftTableView.data = leftData;
    var currentView = Alloy.createController("view1").getView();
    $.ds.contentview.add(currentView);
    $.ds.leftTableView.addEventListener("click", function(e) {
        rowSelect(e);
        $.ds.toggleLeftSlider();
    });
    var storedRowTitle = null;
    $.ds.leftTableView.addEventListener("touchstart", function(e) {
        storedRowTitle = e.row.customTitle;
        storedRowTitle.color = "#FFF";
    });
    $.ds.leftTableView.addEventListener("touchend", function() {
        storedRowTitle.color = "red";
    });
    Ti.App.addEventListener("sliderToggled", function(e) {
        "right" == e.direction ? $.ds.leftMenu.zIndex = 2 : "left" == e.direction && ($.ds.leftMenu.zIndex = 1);
    });
    $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;