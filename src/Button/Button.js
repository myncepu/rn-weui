import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native'
import ButtonText from './ButtonText'
import V from '../variable'

const styles = StyleSheet.create({
  // global
  button: {
    borderRadius: V.weuiBtnBorderRadius,
    borderWidth: StyleSheet.hairlineWidth,
    paddingLeft: 14,
    paddingRight: 14,
    borderColor: 'rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },

  // mini
  mini: {
    paddingLeft: V.weuiBtnMiniFontSize * 0.75,
    paddingRight: V.weuiBtnMiniFontSize * 0.75,
  },

  // primary
  primary: {
    backgroundColor: V.weuiBtnPrimaryBg,
  },

  // warn
  warn: {
    backgroundColor: V.weuiBtnWarnBg,
  },

  // default
  default: {
    backgroundColor: V.weuiBtnDefaultBg,
  },

  // primaryPlain
  primaryPlain: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: V.weuiBtnPrimaryBg,
    backgroundColor: 'transparent'
  },

  // defaultPlain
  defaultPlain: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5A5A5A',
    backgroundColor: 'transparent'
  },
})
const underlayColors = {
  primaryActive: V.weuiBtnPrimaryActiveBg,
  warnActive: V.weuiBtnWarnActiveBg,
  defaultActive: V.weuiBtnDefaultActiveBg,
  primaryPlainActive: 'transparent',
  defaultPlainActive: 'transparent',
}

const getButtonStyles = ({ type, plain, size }) => {
  const config = [styles[type]]
  if (plain) config.push(styles[`${type}Plain`])
  if (size === 'small') config.push(styles.mini)
  return config
}
const getUnderlayColor = ({ type, plain }) => {
  if (plain) return underlayColors[`${type}PlainActive`]
  return underlayColors[`${type}Active`]
}

const Button = (props) => {
  const {
    disabled = false,
    type = 'default',
    size,
    plain = false,
    style,
    children,
    ...others
  } = props

  const buttonStyles = getButtonStyles({ type, plain, size, disabled })
  const underlayColor = getUnderlayColor({ type, plain })

  let touchableProps = {}
  if (!disabled) {
    touchableProps = others
  }

  return (
    <TouchableHighlight
      style={[styles.button, ...buttonStyles, style]}
      underlayColor={underlayColor}
      {...touchableProps}
    >
      <View>
        <ButtonText {...{ type, plain, size, disabled }}>{children}</ButtonText>
      </View>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'warn']),
  size: PropTypes.oneOf(['small']),
  plain: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onLongPress: PropTypes.func,
  style: TouchableHighlight.propTypes.style,
  children: PropTypes.node,
}

export default Button
