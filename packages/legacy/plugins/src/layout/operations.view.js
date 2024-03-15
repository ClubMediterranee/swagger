import React from 'react'

export default function OperationsView ({ getComponent }) {
  const Operations = getComponent('operations', true)
  const Row = getComponent('Row')
  const Col = getComponent('Col')

  return <Row>
    <Col mobile={12} desktop={12}>
      <Operations/>
    </Col>
  </Row>
}
