import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, ActivityIndicator, View } from 'react-native';
import res from '../../../res'

class ImageLoad extends React.Component {
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
      style, source, resizeMode, borderRadius, backgroundColor, children,
      loadingStyle, placeholderSource, placeholderStyle, blurRadius, borderBottomLeftRadius,
      customImagePlaceholderDefaultStyle, topLeftBorderRadius, topRightBorderRadius, borderColor, borderWidth, borderBottomRightRadius 
    } = this.props;
    return (
      <ImageBackground
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={this.onError.bind(this)}
        style={[styles.backgroundImage, style]}
        source={source}
        resizeMode={resizeMode}
        borderRadius={borderRadius}
        blurRadius={blurRadius ? blurRadius : 0}
        imageStyle={{
          borderTopLeftRadius: topLeftBorderRadius,
          borderTopRightRadius: topRightBorderRadius,
          borderColor: borderColor ? borderColor : 'transparent',
          borderWidth: borderWidth ? borderWidth : 0,
          borderBottomLeftRadius: borderBottomLeftRadius,
          borderBottomRightRadius: borderBottomRightRadius
        }}
      >
        {
          (this.state.isLoaded && !this.state.isError) ? children :
            <View
              style={[styles.viewImageStyles,
              {
                borderTopLeftRadius: topLeftBorderRadius,
                borderTopRightRadius: topRightBorderRadius,
                borderBottomLeftRadius: borderBottomLeftRadius,
              },
              backgroundColor ? { backgroundColor: backgroundColor } : res.colors.pink,
              borderRadius ? { borderRadius: borderRadius } : {}]}
            >
              {
                (this.props.isShowActivity && !this.state.isError) &&
                <ActivityIndicator
                  style={styles.activityIndicator}
                  size={loadingStyle ? loadingStyle.size : 'small'}
                  color={loadingStyle ? loadingStyle.color : 'gray'}
                />
              }
              <Image
                style={placeholderStyle ? placeholderStyle : [styles.imagePlaceholderStyles, customImagePlaceholderDefaultStyle]}
                source={placeholderSource ? placeholderSource : res.images.img_placeholer_large}
                resizeMode={"cover"}
              >
              </Image>
            </View>
        }
        {
          this.props.children &&
          <View style={styles.viewChildrenStyles}>
            {
              this.props.children
            }
          </View>
        }
      </ImageBackground >
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
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
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
  }
}

export default ImageLoad;