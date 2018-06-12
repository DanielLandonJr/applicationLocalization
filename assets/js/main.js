import * as UI_Ctrl from './ui.js';
// import * as http from './easyHTTP.js';

const ApplicationLocalization = (() => {
  let frontMatter = '';
  let translations = '';
  let characters = '';
  let convertedData = '';
  let config = {
    apiKey: "AIzaSyAk7uCyrHOzeol2dT_1EOU3wAvO5GWWEPA",
    authDomain: "languagelocalization.firebaseapp.com",
    databaseURL: "https://languagelocalization.firebaseio.com",
    projectId: "languagelocalization",
    storageBucket: "languagelocalization.appspot.com",
    messagingSenderId: "832293263814"
  };

  const loadEventListeners = () => {
    document.querySelector('#selectLanguage').addEventListener('change', languageChanged);
  }

  const languageChanged = (event) => {
    // convertedData array into seperate arrays
    frontMatter = convertedData.filter((item) => item.frontMatter.language === event.target.value)
    .map((item) => item.frontMatter);
    translations = convertedData.filter((item) => item.frontMatter.language === event.target.value)
      .map((item) => item.translations);
    characters = convertedData.filter((item) => item.frontMatter.language === event.target.value)
    .map((item) => item.characters);

    if (event.target.value === 'English') {
      // english selected. will reset interface
      UI_Ctrl.UI.paintUI(frontMatter, translations, 'default');
    } else {
      UI_Ctrl.UI.paintUI(frontMatter, translations, 'translations');

      // there are characters assoicated with the translation
      if (frontMatter[0].characters) {
        UI_Ctrl.UI.paintUI(frontMatter, characters, 'characters');
      }
    }

  }

  const dataLoaded = (data) => {
    // convert data array into seperate arrays
    frontMatter = data.filter((item) => item.frontMatter.language === 'English')
    .map((item) => item.frontMatter);
    translations = data.filter((item) => item.frontMatter.language === 'English')
      .map((item) => item.translations);
    characters = data.filter((item) => item.frontMatter.language === 'English')
    .map((item) => item.characters);

    UI_Ctrl.UI.loadUI();
    
    UI_Ctrl.UI.paintUI(frontMatter, translations, 'default');
  }
  
  // public methods
  return {
    init: () => {
      // initialize firebase
      firebase.initializeApp(config);

      // get database, returns promise
      let dbFireBase = firebase.app().database().ref();

      dbFireBase.once('value')
      .then((response) => {
        // convert json to array
        convertedData = Object.keys(response.val()).map((item) => { return response.val()[item] });

        console.log(convertedData);
                  
        dataLoaded(convertedData);
      })
      .catch((error) => { console.log(error) });

      loadEventListeners();

      // http.easyHTTP.get('./assets/data/localization.json')
      //   .then((response) => { 
      //     // convert json to array
      //     convertedData = Object.keys(response).map((item) => { return response[item] });

      //     dataLoaded(convertedData);
      //   })
      //   .catch((error) => console.log(error));
    }
  }
})();

ApplicationLocalization.init();