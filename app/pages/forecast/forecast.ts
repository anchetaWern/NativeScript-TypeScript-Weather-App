import { EventData } from "data/observable";
import { Page } from "ui/page";
import { ForecastViewModel } from "./forecast-view-model";
import navigation = require('../../common/navigation');

export function navigatingTo(args: EventData) {
  var page = <Page>args.object;
  page.bindingContext = new ForecastViewModel();
}

export function goToMainPage() {
  navigation.goToMainPage();
}
