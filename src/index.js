import { makeXTypes } from './xmlContentTypes';
import * as style from './xmlStyle';

const types = makeXTypes();

console.log(types);

console.log(types.render());

const fonts = new style.Xfonts({ count: 3 }, [
  new style.Xfont({ b: true, i: true, sz: 1 }),
  new style.Xfont({ b: true, u: true, sz: 2 }),
  new style.Xfont({ u: true, i: true, sz: 3 })
]);

console.log(fonts.render());
