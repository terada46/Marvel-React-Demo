import React, { Component, Fragment } from "react"
import ContentLoader from "react-content-loader"

export class ProfileImageLoader extends Component {
  render() {
    return (
      <ContentLoader 
        speed={2}
        width={168}
        height={252}
        viewBox="0 0 168 252"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="8" ry="8" width="168" height="252" />
      </ContentLoader>
    )
  }
};

export class CharacterListLoader extends Component {
  render() {
    return (
      <ContentLoader 
        speed={2}
        width={776}
        height={205}
        viewBox="0 0 776 205"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="44" y="0" rx="8" ry="8" width="120" height="90" /> 
        <rect x="181" y="0" rx="8" ry="8" width="120" height="90" /> 
        <rect x="318" y="0" rx="8" ry="8" width="120" height="90" /> 
        <rect x="455" y="0" rx="8" ry="8" width="120" height="90" /> 
        <rect x="592" y="0" rx="8" ry="8" width="120" height="90" /> 
        <rect x="44" y="108" rx="8" ry="8" width="120" height="90" /> 
        <rect x="181" y="109" rx="8" ry="8" width="120" height="90" /> 
        <rect x="318" y="109" rx="8" ry="8" width="120" height="90" /> 
        <rect x="455" y="108" rx="8" ry="8" width="120" height="90" /> 
        <rect x="592" y="108" rx="8" ry="8" width="120" height="90" />
      </ContentLoader>
    )
  }
}

export class CharacterSmallLoader extends Component {
  render() {
    return (
      <ContentLoader 
        speed={2}
        width={120}
        height={90}
        viewBox="0 0 120 90"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="8" ry="8" width="120" height="90" />
      </ContentLoader>
    )
  }
}

export class ProfileTextLoader extends Component {
  render() {
    return (
      <ContentLoader 
        speed={2}
        width={524}
        height={252}
        viewBox="0 0 524 252"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="2" y="0" rx="8" ry="8" width="104" height="41" /> 
        <rect x="2" y="67" rx="8" ry="8" width="486" height="18" /> 
        <rect x="2" y="108" rx="8" ry="8" width="486" height="18" /> 
        <rect x="2" y="149" rx="8" ry="8" width="486" height="18" /> 
        <rect x="2" y="190" rx="8" ry="8" width="292" height="18" />
      </ContentLoader>
    )
  }
}

export class ComicImageLoader extends Component {
  render() {
    return (
      <ContentLoader 
        speed={2}
        width={168}
        height={252}
        viewBox="0 0 168 252"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="3" ry="3" width="168" height="252" />
      </ContentLoader>
    )
  }
}

export class ComicListLoader extends Component {
  render() {
    const numOfItems = this.props.items || 16;
    const list = []
    const width = 712;
    const paddingRight = 13;
    const paddingBottom1 = 9;
    const paddingBottom2 = 21;
    const itemHeight = 252;
    const textHeight = 10;
    const row = Math.ceil(numOfItems / 4);
    const remainder = numOfItems % row;
    const column = 4;
    let height, space, key = 11;
    for (let i = 1; i <= row; i++) {
      for (let j = 0; j < column; j++) {
        if (remainder !== 0 && i === row && j === remainder) break;
        const itemWidth = (width - paddingRight * (column - 1)) / column;
        const x = j * (itemWidth + paddingRight);
        space = itemHeight + paddingBottom1 * 2 + textHeight * 2 + paddingBottom2;
        const y1 = space * (i - 1);
        const y2 = y1 + paddingBottom1 + itemHeight;
        const y3 = y2 + paddingBottom1 + textHeight;
        list.push(
          <Fragment key={key}>
            <rect
              x={x}
              y={y1}
              rx={3}
              ry={3}
              width={itemWidth}
              height={itemHeight}
            />
            <rect x={x} y={y2} rx={2} ry={2} width={itemWidth * 0.6} height={textHeight} />
            <rect x={x} y={y3} rx={2} ry={2} width={itemWidth * 0.6} height={textHeight} />
          </Fragment>
        )
        height = space * row;
        key += 1;
      }
    }
    
    return (
      <ContentLoader
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        speed={2}
      >
        {list}
      </ContentLoader>
    )
  }
}