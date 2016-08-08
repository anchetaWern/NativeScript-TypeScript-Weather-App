import frame = require('ui/frame');

export function getStartPage() {
  return 'pages/main/main';
}

export function goToForecastPage() {
  frame.topmost().navigate('pages/forecast/forecast');
}

export function goToMainPage() {
  frame.topmost().goBack();
}
