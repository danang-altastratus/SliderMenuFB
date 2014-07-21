function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menurow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "white",
        selectedColor: "white",
        backgroundColor: "#f2f3f4",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.rowView = Ti.UI.createView({
        top: 0,
        height: 44,
        layout: "horizontal",
        id: "rowView"
    });
    $.__views.row.add($.__views.rowView);
    $.__views.icon = Ti.UI.createImageView({
        top: 11,
        left: 10,
        width: 23,
        height: 23,
        id: "icon"
    });
    $.__views.rowView.add($.__views.icon);
    $.__views.title = Ti.UI.createLabel({
        top: 17,
        left: 10,
        color: "black",
        font: {
            fontFamily: "AudiTypeExtended-Normal",
            fontSize: 10.5,
            fontStyle: "normal"
        },
        id: "title"
    });
    $.__views.rowView.add($.__views.title);
    $.__views.separatorLine = Ti.UI.createView({
        height: 1,
        bottom: 0,
        backgroundColor: "#d5d9d8",
        id: "separatorLine"
    });
    $.__views.row.add($.__views.separatorLine);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.icon.image = args.image;
    $.title.text = args.title || "";
    $.row.customView = args.customView || "";
    $.row.customTitle = $.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;