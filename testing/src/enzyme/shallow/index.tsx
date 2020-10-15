import React, { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
function Fade({ children, ...props }: { children: ReactNode; in: boolean }) {
  return (
    <CSSTransition {...props} timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}
class HiddenMessage extends React.Component<{ initialShow: boolean }> {
  static defaultProps = { initialShow: false }
  state = { show: this.props.initialShow }
  toggle = () => {
    this.setState(({ show }: { show: boolean }) => ({ show: !show }))
  }
  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <Fade in={this.state.show}>
          <div>Hello world</div>
        </Fade>
      </div>
    )
  }
}
export { HiddenMessage }
