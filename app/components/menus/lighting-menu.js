import React, {Component} from 'react';
import {
  BrightnessCategory,
  ColorCategory,
  PatternCategory
} from '../lighting-categories';
import styles from './lighting-menu.css';

export const Category = {
  Pattern: 'Patterns',
  Color1: 'Primary Color',
  Color2: 'Secondary Color',
  Brightness: 'Brightness'
};

export class LightingMenu extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedCategory: Category.Pattern
    };
  }

  renderCategories() {
    const {selectedCategory} = this.state;
    const menu = [Category.Pattern];
    return (
      <div className={styles.categories}>
        {menu.map(label => (
          <div
            onClick={_ => this.setState({selectedCategory: label})}
            key={label}
            className={[
              label === selectedCategory && styles.selected,
              styles.category
            ].join(' ')}
          >
            {label}
          </div>
        ))}
      </div>
    );
  }

  renderSelectedCategory(category) {
    const {lightingData} = this.props;
    const {api} = this.props;

    if (api && lightingData) {
      const {color1, color2, brightness, rgbMode} = lightingData;
      const colorsNeededArr = [0, 1, 2, 2, 2, 0, 0, 0, 0, 1, 0];
      const colorsNeeded = colorsNeededArr[rgbMode];
      switch (category) {
        case Category.Pattern:
          return (
            <div>
              <PatternCategory
                rgbMode={rgbMode}
                setRGBMode={mode => this.props.updateRGBMode(mode)}
              />
              <div className={styles.colorControls}>
                {colorsNeeded === 0 ? null : colorsNeeded === 1 ? (
                  <ColorCategory
                    label={'Primary Color'}
                    color={color1}
                    setColor={(hue, sat) => this.props.updateColor(1, hue, sat)}
                  />
                ) : (
                  <React.Fragment>
                    <ColorCategory
                      label={'Primary Color'}
                      color={color1}
                      setColor={(hue, sat) =>
                        this.props.updateColor(1, hue, sat)
                      }
                    />
                    <ColorCategory
                      label={'Secondary Color'}
                      color={color2}
                      setColor={(hue, sat) =>
                        this.props.updateColor(2, hue, sat)
                      }
                    />
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          );
      }
    }
    return null;
  }

  render() {
    return (
      <div className={styles.menu}>
        {this.renderCategories()}
        {this.renderSelectedCategory(this.state.selectedCategory)}
      </div>
    );
  }
}
