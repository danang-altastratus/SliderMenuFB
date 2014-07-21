function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ds.slideMenu/" + s : s.substring(0, index) + "/ds.slideMenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("ds.slideMenu");
    this.__widgetId = "ds.slideMenu";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.ContainerView = Ti.UI.createView({
        id: "ContainerView"
    });
    $.__views.ContainerView && $.addTopLevelView($.__views.ContainerView);
    $.__views.leftMenu = Ti.UI.createView({
        top: "20dp",
        left: "0dp",
        width: "250dp",
        zIndex: "2",
        backgroundColor: "white",
        id: "leftMenu"
    });
    $.__views.ContainerView.add($.__views.leftMenu);
    $.__views.leftTableView = Ti.UI.createTableView({
        left: "0dp",
        backgroundColor: "#f2f3f4",
        scrollable: false,
        separatorColor: "white",
        separatorStyle: "none",
        id: "leftTableView"
    });
    $.__views.leftMenu.add($.__views.leftTableView);
    $.__views.movableview = Ti.UI.createView({
        left: "0",
        zIndex: "3",
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "white",
        id: "movableview"
    });
    $.__views.ContainerView.add($.__views.movableview);
    $.__views.shadowview = Ti.UI.createView({
        shadowColor: "black",
        shadowOffset: {
            x: "0",
            y: "0"
        },
        shadowRadius: "2.5",
        id: "shadowview"
    });
    $.__views.movableview.add($.__views.shadowview);
    $.__views.navview = Ti.UI.createView({
        top: "20dp",
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: "44",
        backgroundColor: "white",
        id: "navview"
    });
    $.__views.shadowview.add($.__views.navview);
    $.__views.MenuButton = Ti.UI.createButton({
        image: "/ds.slideMenu/nav-menu-btn.png",
        backgroundColor: "white",
        left: "0",
        top: "0",
        width: "44",
        height: "44",
        style: "none",
        id: "MenuButton"
    });
    $.__views.navview.add($.__views.MenuButton);
    $.__views.TitleLabel = Ti.UI.createLabel({
        left: 40,
        font: {
            fontFamily: "AudiTypeExtended-ExtendedBold",
            fontSize: 12.5,
            fontStyle: "normal"
        },
        color: "#000000",
        text: "News",
        id: "TitleLabel"
    });
    $.__views.navview.add($.__views.TitleLabel);
    $.__views.ACNALogoImage = Ti.UI.createImageView({
        image: "/ds.slideMenu/logo-acna.png",
        right: 10,
        id: "ACNALogoImage"
    });
    $.__views.navview.add($.__views.ACNALogoImage);
    $.__views.ToolbarBorder = Ti.UI.createView({
        bottom: 0,
        height: 1,
        backgroundColor: "#d5d9d8",
        width: Ti.UI.FILL,
        id: "ToolbarBorder"
    });
    $.__views.navview.add($.__views.ToolbarBorder);
    $.__views.contentview = Ti.UI.createView({
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.Fill,
        top: "64",
        backgroundColor: "green",
        id: "contentview"
    });
    $.__views.shadowview.add($.__views.contentview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var animateRight = Ti.UI.createAnimation({
        left: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200
    });
    var animateReset = Ti.UI.createAnimation({
        left: 0,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200
    });
    var animateLeft = Ti.UI.createAnimation({
        left: -250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200
    });
    var touchStartX = 0;
    var touchRightStarted = false;
    var touchLeftStarted = false;
    var buttonPressed = false;
    var hasSlided = false;
    var direction = "reset";
    $.movableview.addEventListener("touchstart", function(e) {
        touchStartX = e.x;
    });
    $.movableview.addEventListener("touchend", function() {
        if (buttonPressed) {
            buttonPressed = false;
            return;
        }
        if ($.movableview.left >= 150 && touchRightStarted) {
            direction = "right";
            $.MenuButton.touchEnabled = false;
            $.movableview.animate(animateRight);
            hasSlided = true;
        } else if (-150 >= $.movableview.left && touchLeftStarted) {
            direction = "left";
            $.movableview.animate(animateLeft);
            hasSlided = true;
        } else {
            direction = "reset";
            $.MenuButton.touchEnabled = true;
            $.movableview.animate(animateReset);
            hasSlided = false;
        }
        Ti.App.fireEvent("sliderToggled", {
            hasSlided: hasSlided,
            direction: direction
        });
        touchRightStarted = false;
        touchLeftStarted = false;
    });
    $.movableview.addEventListener("touchmove", function(e) {
        var coords = $.movableview.convertPointToView({
            x: e.x,
            y: e.y
        }, $.containerview);
        var newLeft = coords.x - touchStartX;
        touchRightStarted && 250 >= newLeft && newLeft >= 0 || touchLeftStarted && 0 >= newLeft && newLeft >= -250 ? $.movableview.left = newLeft : touchRightStarted && 0 > newLeft || touchLeftStarted && newLeft > 0 ? $.movableview.left = 0 : touchRightStarted && newLeft > 250 ? $.movableview.left = 250 : touchLeftStarted && -250 > newLeft && ($.movableview.left = -250);
        if (newLeft > 5 && !touchLeftStarted && !touchRightStarted) {
            touchRightStarted = true;
            Ti.App.fireEvent("sliderToggled", {
                hasSlided: false,
                direction: "right"
            });
        } else if (-5 > newLeft && !touchRightStarted && !touchLeftStarted) {
            touchLeftStarted = true;
            Ti.App.fireEvent("sliderToggled", {
                hasSlided: false,
                direction: "left"
            });
        }
    });
    $.MenuButton.addEventListener("touchend", function() {
        if (!touchRightStarted && !touchLeftStarted) {
            buttonPressed = true;
            $.toggleLeftSlider();
        }
    });
    exports.toggleLeftSlider = function() {
        if (hasSlided) {
            direction = "reset";
            $.MenuButton.touchEnabled = true;
            $.movableview.animate(animateReset);
            hasSlided = false;
        } else {
            direction = "right";
            $.MenuButton.touchEnabled = false;
            $.movableview.animate(animateRight);
            hasSlided = true;
        }
        Ti.App.fireEvent("sliderToggled", {
            hasSlided: hasSlided,
            direction: direction
        });
    };
    exports.handleRotation = function() {
        $.movableview.width = $.navview.width = $.contentview.width = Ti.Platform.displayCaps.platformWidth;
        $.movableview.height = $.navview.height = $.contentview.height = Ti.Platform.displayCaps.platformHeight;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;