import * as React from 'react'
import {useState} from 'react'
import {Button, Unfold} from '../index'

const UnFoldExample: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const onClick = () => {
    console.log(1)
    setVisible(!visible)
  }

  return (
    <>
      <Button onClick={onClick}> Toggle Visible </Button>
      <Unfold visible={visible}>
        <div style={{width: 100, background: '#00ADB5', height: 150}}>Horizontal</div>
      </Unfold>
    </>
  )
}
export default UnFoldExample
