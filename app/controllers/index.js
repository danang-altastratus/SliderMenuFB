var leftData = [];

function createSection(e) {
    var section = Ti.UI.createTableViewSection();
    var customView = Ti.UI.createView({height: 0});
    
    var menuData = [{
        title: 'News',
        icon: '/ds.slideMenu/news-icon.png'
    }, {
        title: 'Events',
        icon: '/ds.slideMenu/events-icon.png'
    }, {
        title: 'Stories',
        icon: '/ds.slideMenu/stories-icon.png'
    }, {
        title: 'Media Gallery',
        icon: '/ds.slideMenu/media-gallery-icon.png'
    }, {
        title: 'About Us',
        icon: '/ds.slideMenu/about-us-icon.png'
    }];
	
	section.headerView = customView;
    for (var j = 0; j < menuData.length; j++) {
        var args = {            
            title : 'Line ' + j,
            customView : 'view' + j                  
        };
        section.add(Alloy.createController('menurow', args).getView());
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

for (var i = 0; i < 1; i++) {
    leftData[i] = createSection();  
}

// Pass data to widget leftTableView and rightTableView
$.ds.leftTableView.data = leftData;

var currentView = Alloy.createController("view1").getView();
$.ds.contentview.add(currentView);

// Swap views on menu item click
$.ds.leftTableView.addEventListener('click', function selectRow(e) {
	rowSelect(e);
	$.ds.toggleLeftSlider();
});

// Set row title highlight colour (left table view)
var storedRowTitle = null;
$.ds.leftTableView.addEventListener('touchstart', function(e) {
	storedRowTitle = e.row.customTitle;
	storedRowTitle.color = "#FFF";
});
$.ds.leftTableView.addEventListener('touchend', function(e) {
	storedRowTitle.color = "red";
});

Ti.App.addEventListener("sliderToggled", function(e) {
	if (e.direction == "right") {
		$.ds.leftMenu.zIndex = 2;		
	} else if (e.direction == "left") {
		$.ds.leftMenu.zIndex = 1;		
	}
});

$.win.open();
