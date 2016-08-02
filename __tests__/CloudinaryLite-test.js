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

  it('render cloudinary demo image with basic url given a src prop with points and characters name', () => {
    // Render a checkbox with label in the document
    const demoImg = TestUtils.renderIntoDocument(
        <CloudinaryLite cloudName="demo" src="my-root-folder/item/so-s.t.-range-name-and/too-large-no-sense-words-system-34951666.jpg" />
    );

    const demoImgNode = ReactDOM.findDOMNode(demoImg);

    // verify img src
    expect(demoImgNode.getAttribute('src')).toEqual('https://res.cloudinary.com/demo/image/upload/my-root-folder/item/so-s.t.-range-name-and/too-large-no-sense-words-system-34951666.jpg');
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

  it('render cloudinary url, with video resource type auto detected from src  ', () => {
    // Render a checkbox with label in the document
    const demoImg = TestUtils.renderIntoDocument(
        <CloudinaryLite cloudName="demo" src="sample.WebM" />
    );

    const demoImgNode = ReactDOM.findDOMNode(demoImg);

    // verify img src
    expect(demoImgNode.getAttribute('src')).toEqual('https://res.cloudinary.com/demo/video/upload/sample.WebM');
  });

  it('render cloudinary image, with custom component and image as background in style', () => {
    // Render a checkbox with label in the document

    const customComponent = <span/>
    const borderInlineStyle = '3px solid blue'
    const demoImg = TestUtils.renderIntoDocument(
        <CloudinaryLite isInBackground={true} component={customComponent} cloudName="demo" style={{border: borderInlineStyle}} src="sample.jpg" />
    );

    const demoImgNode = ReactDOM.findDOMNode(demoImg);

    // verify img src
    expect(demoImgNode.getAttribute('style')).toContain("background-image: url(https://res.cloudinary.com/demo/image/upload/sample.jpg)");
    expect(demoImgNode.getAttribute('style')).toContain(`border: ${borderInlineStyle}`);
    expect(demoImg.tagName).toEqual(customComponent.tagName)
  });

});
