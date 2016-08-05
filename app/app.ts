import application = require("application");
import navigation = require('./common/navigation');
application.mainModule = navigation.getStartPage();
application.start();
