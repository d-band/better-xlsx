'use strict';

export function add (a, b) {
  return a + b;
}

export function syncRun () {
  return Promise.resolve(1);
}
