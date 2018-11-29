function isExtendsNode(node) {
  return node && node.name === 'Node';
}

module.exports = ({ types: t }) => {
  return {
    visitor: {
      ClassDeclaration(path) {
        if (isExtendsNode(path.node.superClass)) {
          path.get('body').unshiftContainer('body', t.classProperty(
            t.identifier('_xmlName'),
            t.stringLiteral(path.node.id.name.substring(1))
          ));
        }
      }
    }
  };
};
