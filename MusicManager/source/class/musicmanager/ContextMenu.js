qx.Class.define("musicmanager.ContextMenu", 
{
	extend : qx.ui.menu.Menu,
	include: (qx.ui.table.Table, qx.ui.table.MTableContextMenu),

  construct : function()
  {
    this.base(arguments);
	var buttonDeleteContextMenu = new qx.ui.menu.Button("Delete", "musicmanager/delete.png");
	buttonDeleteContextMenu.addListener("execute", function() {
		this.fireEvent("deleteContextMenu");
	  }, this);
	this.add(buttonDeleteContextMenu);
	this.setArrowColumnWidth(50);
  },
  events : 
  {
	"deleteContextMenu" : "qx.event.type.Event"
    
  }
});