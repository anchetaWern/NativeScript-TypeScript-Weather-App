import { EventData } from "data/observable";
import { Page } from "ui/page";
import { MainViewModel } from "./main-view-model";
import navigation = require('../../common/navigation');

export function navigatingTo(args: EventData) {
  var page = <Page>args.object;
  page.bindingContext = new MainViewModel();
}

export function goToForecastPage () {
  navigation.goToForecastPage();
}
