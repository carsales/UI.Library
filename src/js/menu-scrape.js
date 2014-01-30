var siteNav=[];
var nav = $(".csn-navigation");
nav.find(".navigation>li").each(function(i,a){
	var li=$(a), id=li.attr("id"), lnk=li.children("a"), menu, panel=li.children(".menu-panel");
	menu = {className: id};
	menu.topMenu={url:lnk.attr("href"),text:lnk.text().trim()};
	if (panel.length==1){
		var subMenu = menu.subMenu = [];
		panel.find("ul:first > li").each(function(i,a){
			var li = $(a), lnk=li.children("a"), vip = li.hasClass("vip");
			subMenu.push({url:lnk.attr("href"),text:lnk.text().trim(), vip:vip});
		});
		panel = li.find(".menu-content");
		if (panel.length) {
			menu.subMenuContent = panel.html().trim();
		}
	}
	siteNav.push(menu);
});

var networkNav = [];
nav = $("#network");
nav.find("ul>li").each(function(i, a) {
	var li = $(a), lnk = li.children("a"), span;
	networkNav.push("li.");
	networkNav.push(a.className);
	networkNav.push("\n\r\t");
	networkNav.push("a(href=\"" + lnk.attr("href") + "\")(target=_blank)");
	networkNav.push("\n\r\t\t");
	networkNav.push("span.logo");
	networkNav.push("\n\r\t\t");
	span = lnk.children("span").first();
	networkNav.push("| " + span.text().trim());
	networkNav.push("\n\r\t\t");
	networkNav.push("span.content")
	span = lnk.children("span").eq(1);
	networkNav.push("| " + span.text().trim());
});

console.log(networkNav.join(""));