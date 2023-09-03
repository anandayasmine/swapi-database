import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import("../src/components/templates/HomePage/HomePage"), {
  ssr: false,
});

export default class index extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  render() {
    return (
      <HomePage

      />
    )
  }
}
