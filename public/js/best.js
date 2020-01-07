// eslint-disable-next-line import/extensions
import { loadCurrentBest, loadPrevious, loadNext } from './helpers/xvideos.js';

const back = document.querySelector('.back');
const next = document.querySelector('.next');

window.addEventListener('load', loadCurrentBest);
back.addEventListener('click', loadPrevious);
next.addEventListener('click', loadNext);
