/// <reference lib="dom" />
import Alpine from 'alpinejs';
import { APP_TITLE } from '@workspace/lib';
import { UserInformationService } from './services/UserInformationService.ts';

//
// This is apparently not required, even though Alpine doc says it is
//
// The declare global block tells TypeScript that you're extending existing global types, and the interface Window declaration merges with the existing Window interface to add the Alpine property.
// declare global {
//     interface Window {
//         Alpine: typeof Alpine;
//     }
// }
//window.Alpine = Alpine
//Alpine.start()

// Set the browser title when the script loads
document.title = APP_TITLE;

// W3.CSS Modal
// TODO update modal to have different modes (info, error)
const showModal = (msg: string) => {
  document.getElementById('modal')!.style.display = 'block';
  const p = document.getElementById('modalMessage');
  p!.innerText = msg;
};

const store = {
  display: 'value from alpine store',
  showModal: function (msg: string) {
    console.log(`showModal: ${msg}`);
    showModal(msg);
  }
};
Alpine.store('page', store);

//
// Example store that backs the User Information Form
//
const userInformationFormStore = {
  firstName: 'Type first name here',
  lastName: 'Type last name here',
  age: 0,
  occupation: '',
  occupations: [
    { name: 'Choose your occupation', value: '' },
    { name: 'Student', value: 'student' },
    { name: 'Teacher', value: 'teacher' },
    { name: 'Product Manager', value: 'product manager' },
    { name: 'Doctor', value: 'doctor' },
    { name: 'Lawyer', value: 'lawyer' },
    { name: 'Other', value: 'other' }    
  ],
  gender: '',
  genders: ['', 'M', 'F'],
  directions: 'Please fill out the form and press Submit. This text comes from an Alpine store.',
  submit: async function () {
    if (this.firstName.length > 0 && this.lastName.length > 0 && this.age > 0 && this.occupation.length > 0 && this.gender.length > 0) {
      globalThis.alert('Data validation passed'); // use globalThis instead of window
      showModal('Data validation passed');
      console.log(`submitting form ${this.firstName} | ${this.lastName} | ${this.age} | ${this.occupation} | ${this.gender}`);
      const service = new UserInformationService();
      service.saveUserInformation({firstName: this.firstName, lastName: this.lastName, age: this.age, occupation: this.occupation, gender: this.gender});
    } else {
      console.log('data validation failed.');
    }
  },
};
Alpine.store('userInformationForm', userInformationFormStore);

Alpine.start();
