import * as UI_Ctrl from './ui.js';

const ApplicationLocalization = (() => {
  let frontMatter = '';
  let translations = '';
  let characters = '';
  let convertedData = '';
  let config = {
    apiKey: "AIzaSyDz-NWkcHxTq6wDoaCop60IO9HdJ1MUmu4",
    authDomain: "localization-languages.firebaseapp.com",
    databaseURL: "https://localization-languages.firebaseio.com",
    projectId: "localization-languages",
    storageBucket: "localization-languages.appspot.com",
    messagingSenderId: "2110629738"
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
                  
        dataLoaded(convertedData);
      })
      .catch((error) => { console.log(error) });

      loadEventListeners();
    }
  }
})();

ApplicationLocalization.init();