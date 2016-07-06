# react-cloudinary-lite

A simple and lightweight React component for cloudinary resources

## Installation

    npm install --save react-cloudinary-lite

## Usage

`CloudinaryLite` component return a tag (video or image) with resource from cloudinary.

Set cloud_name in yout app context:
```javascript
class MyApp extends React.Component {
  getChildContext() {
    return { cloudName: 'myCloudName' };
  }
}

render() {
  <MainComponent />
}

MyApp.childContextTypes = {
  cloudName: React.PropTypes.string,
};
```

Use the component in easy way:
```javascript
import CloudinaryLite from 'react-cloudinary-lite'

class MainComponent extends React.Component {

  render() {
    <CloudinaryLite src="myImg.png" />
  }

}
```

it will render:
```html
 <img src='http://res.cloudinary.com/myCloudName/image/upload/myImg.png'>
```



## License

MIT Licensed. Copyright (c) Futurecommerce 2016.