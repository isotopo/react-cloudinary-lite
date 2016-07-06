'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CloudinaryLite = function (_Component) {
  _inherits(CloudinaryLite, _Component);

  function CloudinaryLite() {
    _classCallCheck(this, CloudinaryLite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CloudinaryLite).apply(this, arguments));
  }

  _createClass(CloudinaryLite, [{
    key: 'createCloudinaryUrl',


    /**
     * simple function to create utl string to fetch a resource from cloudinary followoing cloudinary docs
     * @param {object} requiredInfo - required info for fetch resource, it is protocol, cloudName, resourceType, type, publickId
     * @param {object} transformations - optional it can be width, height, crop, gravity and aspectRatio
     * @returns {string} 
     */
    value: function createCloudinaryUrl(requiredInfo, transformations) {
      var protocol = requiredInfo.protocol;
      var cloudName = requiredInfo.cloudName;
      var resourceType = requiredInfo.resourceType;
      var type = requiredInfo.type;
      var publicId = requiredInfo.publicId;

      // base url with required data

      var baseUrl = protocol + '://res.cloudinary.com/' + cloudName + '/' + resourceType + '/' + type;
      var finalUrl = baseUrl;

      // add all transfromations in encoded url from (cloudinary docs)
      if (typeof transformations !== 'undefined') {
        var transformationsEncoded = [];
        for (var _option in transformations) {
          switch (_option) {
            case 'width':
              transformationsEncoded.push('w_' + transformations[_option]);
              break;
            case 'heigth':
              transformationsEncoded.push('h_' + transformations[_option]);
              break;
            case 'crop':
              // if is array creates an array with prefix c and concat with final transformations encoded
              if (Array.isArray(transformations[_option])) {
                var crops = transformations[_option];
                var cropsEncoded = crops.map(function (crop) {
                  return 'c_' + crop;
                });
                transformationsEncoded.concat(cropsEncoded);
              } else transformationsEncoded.push('c_' + transformations[_option]);
              break;
            case 'gravity':
              transformationsEncoded.push('g_' + transformations[_option]);
              break;
            case 'aspectRatio':
              transformationsEncoded.push('ar_' + transformations[_option]);
              break;
          }

          // finalally add new path and transform all transformations in string with commas in each transformation encoded
          finalUrl + '/' + transformationsEncoded.join();
        }
      }

      // add resource public_id and format and version if exist
      finalUrl = finalUrl + '/' + (options.version ? 'v' + options.version + '/' : '') + publicId + (option.format ? '.' + options.format : '');
      return finalUrl;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var transformations = _props.transformations;
      var format = _props.format;
      var _props2 = this.props;
      var publicId = _props2.publicId;
      var resourceType = _props2.resourceType;
      var type = _props2.type;
      var version = _props2.version;
      var _props2$cloudName = _props2.cloudName;
      var cloudName = _props2$cloudName === undefined ? this.context.cloudName : _props2$cloudName;


      if (publicId && resourceType && type && version && cloudName) {
        var finalProps = (0, _blacklist2.default)(this.props, 'transformations', 'secure', 'publicId', 'cloudName', 'resourceType', 'type', 'version', 'format');
        var protocol = this.props.secure ? 'https' : 'http';
        var requiredCloudinaryUrlInfo = { protocol: protocol, cloudName: cloudName, resourceType: resourceType, type: type, publicId: publicId };
        var url = this.createCloudinaryUrl(requiredCloudinaryUrlInfo, transformations);
        var resourceTag = resourceType == 'image' ? 'img' : 'video';

        return _react2.default.createElement('resourceTag', _extends({ src: url }, finalProps));
      }

      return false;
    }
  }]);

  return CloudinaryLite;
}(_react.Component);

exports.default = CloudinaryLite;


CloudinaryLite.propTypes = {
  publicId: _react.PropTypes.string.isRequired,
  resourceType: _react.PropTypes.oneOf(['image', 'raw', 'video']),
  type: _react.PropTypes.oneOf(['upload', 'private', 'authenticated']),
  version: _react.PropTypes.number,
  secure: _react.PropTypes.bool,
  cloudName: _react.PropTypes.string.isRequired,
  transformations: _react.PropTypes.shape({
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    gravity: _react.PropTypes.string,
    crop: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array])
  })
};

CloudinaryLite.defaultProps = {
  resourceType: 'image',
  type: 'upload',
  secure: true
};

CloudinaryLite.contextTypes = {
  cloudName: _react.PropTypes.string
};
