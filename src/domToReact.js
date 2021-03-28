import React from 'react';

/**
 * inspired by https://github.com/remarkablemark/html-react-parser/blob/master/lib/dom-to-react.js
 * but a very stripped down version
 * - no support for
 *  - replace
 *  - transforming attribs (any that are needed should be hard coded here)
 *  - style props (not needed in head)
 * 
 * Will work with script tags however its NOT FOR INJECTING CODE - use this for things like <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}/>
 */
const domToReact =(nodes=[], options={}) => {

  const library = options.library || React;
  const { createElement } = library;

  const result = []

  const len = nodes.length

  for (let i = 0; i < len; i+=1) {
    let node = nodes[i];

    let children = null;
    const props = {...node.attribs}

    switch (node.type) {
      case 'script':
      case 'style':
        // prevent text in <script> or <style> from being escaped
        // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
        if (node.children[0]) {
          props.dangerouslySetInnerHTML = {
            __html: node.children[0].data
          };
        }
        break;

      case 'tag':
        if (node.children && node.children.length) {
          // continue recursion of creating React elements (if applicable)
          children = domToReact(node.children, options);
        }
        break;

      // skip all other cases (e.g., comment, text)
      default:
        node = null
    }
    
    if (node) {
      // set "key" prop for sibling elements
      // https://fb.me/react-warning-keys
      if (len > 1) {
        props.key = i;
      }

      result.push(createElement(node.name, props, children));
    }
  }

  return result

}
export default domToReact