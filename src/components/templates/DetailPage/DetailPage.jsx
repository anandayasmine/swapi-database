import Router from 'next/router'
import React, { Component } from 'react'
import getDataDetail from '../../../data/getDataDetail'


export default class DetailPage extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  async assignData() {

    try {

      const id = Router.query.slug
      console.log("🚀 ~ file: DetailPage.jsx ~ line 20 ~ DetailPage ~ assignData ~ id", id)

      let data

      try {

        data = JSON.parse(localStorage.getItem(id))

      }
      catch (err) {}
      
      
      if(!data){

        const response = await getDataDetail({
          id: id
        })

        console.log("🚀 ~ file: DetailPage.jsx ~ line 32 ~ DetailPage ~ assignData ~ response", response)
        if (response.status == 200) {

          data = response.payload
          localStorage.setItem(id, JSON.stringify(data))

        }

      }


      this.setState({
        data,
        id
      })


    }
    catch (err) {

      console.log("🚀 ~ file: DetailPage.jsx ~ line 17 ~ DetailPage ~ assignData ~ err", err)

    }
  }

  handleEvent(type) {
    try {

      switch (type) {

        case 'back': {
          Router.push('/')
        } break
      }

    }
    catch (err) {

      console.log("🚀 ~ file: DetailPage.jsx ~ line 37 ~ DetailPage ~ handleEvent ~ err", err)

    }
  }

  async componentDidMount() {

    await this.assignData()

  }
  componentWillUnmount() {

    if (this.state.data && this.state.id) {

      localStorage.removeItem(this.state.id)

    }

  }

  render() {
    const {
      state: {
        data
      },
      props: {

      }
    } = this


    return (
      <>
        {
          data &&
          <div className='templates-detailpage'>

            <div className='block-header'>

              <div className='wrap-button-back'>
                <button onClick={this.handleEvent.bind(this, 'back')}>
                  Back
                </button>
              </div>

              <h1>{data.name}</h1>
            </div>

            <div className={'block-body ' + (data.text ? '' : 'empty')}>
              <table>
                <tr>
                  <td>Born</td>
                  <td> : </td>
                  <th>{data?.birth_year}</th>
                </tr>
                <tr>
                  <td>Body Mass</td>
                  <td> : </td>
                  <th>{data?.hair_color}</th>
                </tr>
                <tr>
                  <td>Height</td>
                  <td> : </td>
                  <th>{data?.height} cm</th>
                </tr>
              </table>
            </div>



          </div>
        }
      </>
    )
  }
}
