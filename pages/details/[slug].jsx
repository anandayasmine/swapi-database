import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const DetailPage = dynamic(() => import("../../src/components/templates/DetailPage/DetailPage"), {
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
      <DetailPage
      
      />
    )
  }
}
