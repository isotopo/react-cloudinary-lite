jest.unmock('../src/index.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CloudinaryLite from '../src/index.js';

describe('CloudinaryLite', () => {

  it('render cloudinary demo image with basic url given a src prop  ', () => {
    // Render a checkbox with label in the document
    const demoImg = TestUtils.renderIntoDocument(
        <CloudinaryLite cloudName="demo" src="sample.jpg" />
    );

    const demoImgNode = ReactDOM.findDOMNode(demoImg);

    // verify img src
    expect(demoImgNode.getAttribute('src')).toEqual('https://res.cloudinary.com/demo/image/upload/sample.jpg');
  });

  it('render cloudinary demo image with resize and crop url  ', () => {
    // Render a checkbox with label in the document
    const demoImg = TestUtils.renderIntoDocument(
        <CloudinaryLite cloudName="demo" src="sample.jpg" transformations={{width:300, height: 200, crop: 'crop'}} />
    );

    const demoImgNode = ReactDOM.findDOMNode(demoImg);

    // verify img src
    expect(demoImgNode.getAttribute('src')).toEqual('https://res.cloudinary.com/demo/image/upload/w_300,h_200,c_crop/sample.jpg');
  });

  it('render cloudinary demo image with resize and two crops  ', () => {
    // Render a checkbox with label in the document
    const demoImg = TestUtils.renderIntoDocument(
        <CloudinaryLite cloudName="demo" src="sample.jpg" transformations={{width:300, height: 200, crop: ['crop', 'scale']}} />
    );

    const demoImgNode = ReactDOM.findDOMNode(demoImg);

    // verify img src
    expect(demoImgNode.getAttribute('src')).toEqual('https://res.cloudinary.com/demo/image/upload/w_300,h_200,c_crop,c_scale/sample.jpg');
  });

});
