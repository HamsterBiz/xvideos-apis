// eslint-disable-next-line import/extensions
import { loadNext, loadPrevious, loadCurrentDashboard } from './helpers/xvideos.js';

const back = document.querySelector('.back');
const next = document.querySelector('.next');

window.addEventListener('load', loadCurrentDashboard);
back.addEventListener('click', loadPrevious);
next.addEventListener('click', loadNext);
