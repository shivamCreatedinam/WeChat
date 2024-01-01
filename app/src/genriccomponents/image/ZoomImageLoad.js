import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, ActivityIndicator, View, Dimensions } from 'react-native';
import res from '../../../res'
import { myHeight, myWidth } from '../../utility/Utils';
import ImageZoom from 'react-native-image-pan-zoom';

class ZoomImageLoad extends React.Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    });
  }

  onError() {
    this.setState({
      isError: true
    });
  }

  render() {
    const {
      style, source, placeholderStyle, customImagePlaceholderDefaultStyle
    } = this.props;
    return (
      <View style={styles.modalImage}>
        <ImageZoom 
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={myWidth}
            imageHeight={myHeight}>
          <Image
            style={placeholderStyle ? placeholderStyle : [styles.imagePlaceholderStyles, customImagePlaceholderDefaultStyle]}
            source={source ? source : res.images.img_placeholer_large}
            resizeMode={"contain"}
          >
          </Image>
        </ImageZoom>
      </View>
    );
  }
}


const styles = {
  backgroundImage: {
    position: 'relative',
  },
  activityIndicator: {
    position: 'absolute',
    margin: 'auto',
    zIndex: 9,
  },
  viewImageStyles: {
    flex: 1,
    backgroundColor: '#e9eef1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePlaceholderStyles: {
    width: myWidth,
    height: myHeight,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  modalImage: {
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
  },
}

export default ZoomImageLoad;