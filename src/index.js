import _ from 'lodash';
import './style.css';
function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Zulfizar', 'Abdumurodova', 'Arziqul qizi'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());