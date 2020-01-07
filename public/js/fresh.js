// eslint-disable-next-line import/extensions
import { loadFreshVideos, handleBack, handleNext } from './helpers/xvideos.js';

const back = document.querySelector('.back');
const next = document.querySelector('.next');

window.addEventListener('load', loadFreshVideos);
back.addEventListener('click', handleBack);
next.addEventListener('click', handleNext);
