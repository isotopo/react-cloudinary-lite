import React, { Component, PropTypes } from 'react'
import blacklist from 'blacklist'

export default class CloudinaryLite  extends Component {
  static SUPPORTED_VIDEO_FORMATS = ['mp4', 'webm', 'ogg']
  static OPTION_ENCODED_DICTIONARY = {
    'width': 'w',
    'height': 'h',
    'crop': 'c',
    'gravity': 'g',
    'aspectRatio': 'ar',
    'radius': 'r',
    'angle': 'a',
    'opacity': 'o',
    'border': 'bo',
    'background': 'b'
  }
  /**
   * simple function to create utl string to fetch a resource from cloudinary followoing cloudinary docs
   * @param {object} requiredInfo - required info for fetch resource, it is protocol, cloudName, resourceType, type, publickId
   * @param {object} transformations - optional it can be width, height, crop, gravity and aspectRatio
   * @returns {string} 
   */
  createCloudinaryUrl (requiredInfo, transformations, options) {
    let {protocol, cloudName, resourceType, type, publicId} = requiredInfo

    // base url with required data
    let baseUrl = `${protocol}://res.cloudinary.com/${cloudName}/${resourceType}/${type}`
    let finalUrl = baseUrl;

    // add all transfromations in encoded url from (cloudinary docs)
    if (typeof transformations !== 'undefined') {
      // create an array to store all transformations encoded in url format (cloudinary docs)
      let transformationsEncoded = []

      for (let option in transformations) {
        // translate option name in format x, for example width == w if not exist you can pass raw option like mOp == mOp
        let translatedOption = CloudinaryLite.OPTION_ENCODED_DICTIONARY[option] || option

        // If the option is an array, transform in sub array of chained transformations of the same type and concat with
        // encoded all encoded options, example {crop: ['scale', 'crop']} == c_scale,c_crop
        if (Array.isArray(transformations[option])) {
          let chainedOptions = transformations[option]
          let chainedOptionsEncoded = chainedOptions.map((chainedOption) => {
            return `${translatedOption}_${chainedOption}`
          })
          transformationsEncoded = transformationsEncoded.concat(chainedOptionsEncoded)
        } else
          // if not is an array only add encoded option in format mOp_value
          transformationsEncoded.push(`${translatedOption}_${transformations[option]}`)
      }
      // finalally add new path and transform all transformations in string with commas in each transformation encoded
        finalUrl = finalUrl + '/' + transformationsEncoded.join()
        
    }
      
    // add resource public_id and format and version if exist
    finalUrl = finalUrl + '/' + (options.version ? 'v' + options.version + '/' : '') + publicId + (options.format ? '.' + options.format : '')
    return finalUrl
  }
  
  render() {
    let { transformations, publicId, format, src, resourceType, type, version } = this.props;
    const {cloudName = this.context.cloudName } = this.props;

    if ((src || publicId) && resourceType && type  && cloudName) {
      // filter, and clear component props to inherit the others
      let finalProps = blacklist(this.props, 'transformations', 'secure', 'publicId', 'cloudName', 'resourceType', 'type', 'version', 'format', 'src', 'isInBackground', 'component')

      // if prop src is defined, extract and override resource public_id and format
      if (src) {
        let resourceNameAndExtension = src.split('.')
        publicId = resourceNameAndExtension[0]
        format = resourceNameAndExtension[1]
        resourceType = (CloudinaryLite.SUPPORTED_VIDEO_FORMATS.indexOf(format.toLowerCase()) > -1) ? 'video' : 'image'
      }

      let protocol = this.props.secure ? 'https' : 'http'
      // for default (https, context.CloudName, image, upload, props.publicId)
      let requiredCloudinaryUrlInfo = {protocol, cloudName, resourceType, type, publicId}
      
      // optional info to cloudinary url resource
      let options = {version, format}
      
      const url = this.createCloudinaryUrl(requiredCloudinaryUrlInfo, transformations, options)

      if (this.props.component){        
        if (this.props.isInBackground) {
          let {style = {}} = this.props
          finalProps.style = {...style, backgroundImage: `url(${url})`}
        }
        else finalProps.src = url
        
        const {component: CustomComponent} = this.props
        return React.cloneElement(CustomComponent, finalProps)
        
      } else {
        const ResourceTag = resourceType == 'image' ? "img" : "video"        
        return this.props.children ? <ResourceTag src={url} {...finalProps}> this.props.children </ResourceTag> : <ResourceTag src={url} {...finalProps} />;
      }
      
    }

    return false;
  }
}

CloudinaryLite.propTypes = {
  src: PropTypes.string,
  publicId: PropTypes.string,
  component: PropTypes.element,
  isInBackground: PropTypes.bool,
  resourceType: PropTypes.oneOf(['image', 'raw', 'video']),
  type: PropTypes.oneOf(['upload', 'private', 'authenticated']),
  version: PropTypes.number, 
  secure: PropTypes.bool,
  cloudName: PropTypes.string.isRequired,
  transformations: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    gravity: PropTypes.string,
    crop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  })
};

CloudinaryLite.defaultProps = {
  resourceType: 'image',
  type: 'upload',
  secure: true
}

CloudinaryLite.contextTypes = {
  cloudName: PropTypes.string
};
