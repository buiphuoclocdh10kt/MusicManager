qx.Class.define("musicmanager.MainWindow", 
{
	extend : qx.ui.container.Composite,

  construct : function()
  {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Grow);
	this.getMenuBar();
  },
  members:{
	  getMenuBar : function()
    {
		
      var menubar = new qx.ui.menubar.MenuBar;
      //menubar.setWidth(600);
      this.add(menubar);

      var fileMenu = new qx.ui.menubar.Button("File", null, this.getFileMenu());
      var systemMenu = new qx.ui.menubar.Button("System", null, this.getSystemMenu());
      var aboutMenu = new qx.ui.menubar.Button("About", null, this.getAboutMenu());

      menubar.add(fileMenu);
      menubar.add(systemMenu);
      menubar.add(aboutMenu);
      
    },
	getFileMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var buttonAdd = new qx.ui.menu.Button("Add", "musicmanager/add.png");
      var buttonModify = new qx.ui.menu.Button("Modify", "musicmanager/modify.png");
      var buttonDelete = new qx.ui.menu.Button("Delete", "musicmanager/delete.png");
      var buttonExit = new qx.ui.menu.Button("Exit", "musicmanager/exit.png");

      menu.add(buttonAdd);
      menu.add(buttonModify);
      menu.add(buttonDelete);
      menu.add(buttonExit);
	  menu.setArrowColumnWidth(50);

      return menu;
    },
	getSystemMenu : function()
    {
      var menu = new qx.ui.menu.Menu();

      var buttonSignUp = new qx.ui.menu.Button("Sign Up", "musicmanager/signUp.png");
	  var buttonSignOut = new qx.ui.menu.Button("Sign Out", "musicmanager/signOut.png");
	  
	  buttonSignOut.addListener("execute", function() {
		this.fireEvent("logOut");
	  }, this);
     
      menu.add(buttonSignUp);
      menu.add(buttonSignOut);
	  menu.setArrowColumnWidth(50);
      
      return menu;
    },
	getAboutMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var buttonAbout = new qx.ui.menu.Button("About us", "musicmanager/about.png");
      var buttonContact = new qx.ui.menu.Button("Contact", "musicmanager/contact.png");
	  
      menu.add(buttonAbout);
      menu.add(buttonContact);

      menu.setArrowColumnWidth(50);
      return menu;
    }
	
  },
  events : 
  {
	"logOut" : "qx.event.type.Event"
    
  }
  
});