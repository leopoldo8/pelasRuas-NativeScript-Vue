import * as application from 'tns-core-modules/application';

import * as platform from 'tns-core-modules/platform';

import Vue from 'nativescript-vue';

import router from './router';

import store from './store';

import './styles.scss';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

if (platform.isIOS) {
  GMSServices.provideAPIKey('AIzaSyBiqQpMaeNX5Fs86E1R3I1dk9wr_eoNA8c');
}

//register plugins
Vue.registerElement('MapView', () => require('nativescript-google-maps-sdk').MapView);
const SocialLogin = require('nativescript-social-login').SocialLogin;

if (application.android) {
  application.android.on(application.AndroidApplication.activityCreatedEvent, (event) => {
      let result = SocialLogin.init({
          activity: event.activity,
          google: {
          initialize: true
          },
          facebook: {
          initialize: false
          }
      });
      console.log(result);
  });
};

SocialLogin.addLogger(function (msg, tag) {
  console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
});

new Vue({

  router,
  template: `<Frame><router-view/></Frame>`,

  store,

}).$start();
