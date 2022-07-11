
import React from 'react';
import Slideshow from 'react-native-image-slider-show';
// https://www.npmjs.com/package/react-native-image-slider-show

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      // interval: null,
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000),
      dataSource: [
        {
          title: 'Title 1',
          caption: 'Caption 1777',
          url: 'http://placeimg.com/640/480/any',
        }, {
          title: 'Title 2',
          caption: 'Caption 27777',
          url: 'http://placeimg.com/640/480/any',
        }, {
          title: 'Title 3',
          caption: 'Caption 37777',
          url: 'http://placeimg.com/640/480/any',
        },
      ],
    };
  }

  componentDidMount() {
    
  }

  // componentWillMount() {
  //   this.setState({
      
  //   });
  // }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
    <Slideshow 
        dataSource={this.state.dataSource}
        position={this.state.position}
        // onPositionChanged={position => this.setState({ position })} 
        />
    );
  }
}

// https://www.npmjs.com/package/react-native-image-slider-show