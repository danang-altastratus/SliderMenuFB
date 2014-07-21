function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ds.slideMenu/" + s : s.substring(0, index) + "/ds.slideMenu/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "leftMenu",
    style: {
        top: "20dp",
        left: "0dp",
        width: "250dp",
        zIndex: "2",
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "leftTableView",
    style: {
        left: "0dp",
        backgroundColor: "#f2f3f4",
        scrollable: false,
        separatorColor: "white",
        separatorStyle: "none"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "navview",
    style: {
        top: "20dp",
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: "44",
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "movableview",
    style: {
        left: "0",
        zIndex: "3",
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "shadowview",
    style: {
        shadowColor: "black",
        shadowOffset: {
            x: "0",
            y: "0"
        },
        shadowRadius: "2.5"
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "TitleLabel",
    style: {
        left: 40,
        font: {
            fontFamily: "AudiTypeExtended-ExtendedBold",
            fontSize: 12.5,
            fontStyle: "normal"
        },
        color: "#000000",
        text: "News"
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "ACNALogoImage",
    style: {
        image: "/ds.slideMenu/logo-acna.png",
        right: 10
    }
}, {
    isId: true,
    priority: 100000.0013,
    key: "ToolbarBorder",
    style: {
        bottom: 0,
        height: 1,
        backgroundColor: "#d5d9d8",
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100101.0006,
    key: "contentview",
    style: {
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.Fill,
        top: "64",
        backgroundColor: "green"
    }
}, {
    isId: true,
    priority: 100101.0009,
    key: "MenuButton",
    style: {
        image: "/ds.slideMenu/nav-menu-btn.png",
        backgroundColor: "white",
        left: "0",
        top: "0",
        width: "44",
        height: "44",
        style: "none"
    }
} ];