import React, { Component, PropTypes } from 'react'
import blacklist from 'blacklist'

export default class CloudinaryLite  extends Component {
  static SUPPORTED_VIDEO_FORMATS = ['mp4', 'webm', 'ogg']
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
      let transformationsEncoded = []
      for (let option in transformations) {
        switch (option) {
        case 'width':
          transformationsEncoded.push('w_' + transformations[option])
          break;
        case 'height':
          transformationsEncoded.push('h_' + transformations[option])
          break;
        case 'crop':
          // if is array creates an array with prefix c and concat with final transformations encoded
          if (Array.isArray(transformations[option])) {
            let crops = transformations[option]
            let cropsEncoded = crops.map((crop) => {
              return 'c_' + crop
            })
            transformationsEncoded = transformationsEncoded.concat(cropsEncoded)
          } else 
            transformationsEncoded.push('c_' + transformations[option])
          break;
        case 'gravity':
          transformationsEncoded.push('g_' + transformations[option])
          break;
        case 'aspectRatio':
          transformationsEncoded.push('ar_' + transformations[option])
          break;
        }
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
      let finalProps = blacklist(this.props, 'transformations', 'secure', 'publicId', 'cloudName', 'resourceType', 'type', 'version', 'format', 'src')

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
      const ResourceTag = resourceType == 'image' ? "img" : "video"
      
      return <ResourceTag src={url} {...finalProps} />;
      
    }

    return false;
  }
}

CloudinaryLite.propTypes = {
  src: PropTypes.string,
  publicId: PropTypes.string,
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
