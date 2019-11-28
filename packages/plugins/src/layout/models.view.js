import React from 'react'

export default function ModelsView ({ getComponent }) {
  const Models = getComponent('Models', true)
  const Row = getComponent('Row')
  const Col = getComponent('Col')

  return <Row>
    <Col mobile={12} desktop={12}>
      <Models/>
    </Col>
  </Row>
}
