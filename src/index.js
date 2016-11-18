import { makeXmlTypes } from './xmlContentTypes';
import * as style from './xmlStyle';

const types = makeXmlTypes();

console.log(types);

console.log(types.render());

const fonts = new style.Xfonts({ count: 3 }, [
  new style.Xfont({ b: true, i: true, sz: 'hello' }),
  new style.Xfont({ b: true, u: true, sz: 'test' }),
  new style.Xfont({ u: true, i: true, sz: 'world' })
]);

console.log(fonts.render());
