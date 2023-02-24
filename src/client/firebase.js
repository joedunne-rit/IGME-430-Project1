import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase, ref, set, get, push, onValue, increment,
} from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCZLadSycoOngWlpupuUv98hD378IlYCzQ',

  authDomain: 'project-1-1049d.firebaseapp.com',

  databaseURL: 'https://project-1-1049d-default-rtdb.firebaseio.com',

  projectId: 'project-1-1049d',

  storageBucket: 'project-1-1049d.appspot.com',

  messagingSenderId: '142704357515',

  appId: '1:142704357515:web:83abaf09653adf6101a48e',

};

const spellPath = 'favorite-spells/';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();

// Writes a value to database/increases fave count by 1
export function writeFaveData(name) {
  const spellRef = ref(db, spellPath + name.toLowerCase(), name);
  set(spellRef, {
    name,
    faves: increment(1),
  });
  console.log(`${name} added to database`);
}

// Decreases fave count by 1
export function removeFaveData(name) {
  const spellRef = ref(db, spellPath + name.toLowerCase(), name);
  set(spellRef, {
    name,
    faves: increment(-1),
  });
  console.log(`faves for ${name} decreased`);
}

// Gets database and sorts out which 3 have the most favorites, displays those 3 favorites
export function topThree(callback) {
  const topSpells = [{ name: 'fireball', faves: -1 }, { name: 'fireball', faves: -1 }, { name: 'fireball', faves: -1 }];
  const spellRefs = ref(db, spellPath);
  get(spellRefs).then((data) => {
    data.forEach((spell) => {
      console.log(spell.val().faves);
      let currentSpell = spell.val();
      if (topSpells[0].faves < currentSpell.faves) {
        const temp = currentSpell;
        currentSpell = topSpells[0];
        topSpells[0] = temp;
      }
      if (topSpells[1].faves < currentSpell.faves) {
        const temp = currentSpell;
        currentSpell = topSpells[1];
        topSpells[1] = temp;
      }
      if (topSpells[2].faves < currentSpell.faves) {
        const temp = currentSpell;
        currentSpell = topSpells[2];
        topSpells[2] = temp;
      }
    });
    console.log(topSpells);
    callback(topSpells);
    return topSpells;
  });
}

export {
  db, ref, set, get, push, onValue, getDatabase,
};
