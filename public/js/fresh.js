// eslint-disable-next-line import/extensions
import { loadNext, loadCurrentFresh, loadPrevious } from './helpers/xvideos.js';

const back = document.querySelector('.back');
const next = document.querySelector('.next');

window.addEventListener('load', loadCurrentFresh);
back.addEventListener('click', loadPrevious);
next.addEventListener('click', loadNext);
