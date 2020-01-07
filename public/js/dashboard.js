// eslint-disable-next-line import/extensions
import { handleNext, handleBack, loadDashboard } from './helpers/xvideos.js';

const back = document.querySelector('.back');
const next = document.querySelector('.next');

window.addEventListener('load', loadDashboard);
back.addEventListener('click', handleBack);
next.addEventListener('click', handleNext);
