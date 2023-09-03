import React, { Component } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import getDataDetail from '../../../data/getDataDetail';
import getDataPeople from '../../../data/getDataPeople';

import _ from 'lodash'
import nProgress from 'nprogress';


export default class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      itemPerPage: 10,
      limit: 2, //assumption based on data return 
      dataView: [],
      filter: {
        keyword: null,
        location: null,
        isFullTime: null,
      },
    }
  }

  async assignDataDetail(params = {}, addition = false) {

    try {

      const page = params?.page || this.state.page
      console.log("🚀 ~ file: HomePage.jsx ~ line 32 ~ HomePage ~ assignDataDetail ~ page", page)

      const newData = params?.newData || this.state.newData || []
      const itemPerPage = newData?.results?.length || this.state.itemPerPage
      console.log("🚀 ~ file: HomePage.jsx ~ line 34 ~ HomePage ~ assignDataDetail ~ itemPerPage", itemPerPage)

      const startPoint = (page > 1 ? page * itemPerPage : page)
      console.log("🚀 ~ file: HomePage.jsx ~ line 37 ~ HomePage ~ assignDataDetail ~ startPoint", startPoint)

      const endPoint = startPoint + itemPerPage
      console.log("🚀 ~ file: HomePage.jsx ~ line 38 ~ HomePage ~ assignDataDetail ~ endPoint", endPoint)

      const dataView = [
        ...(this.state.dataView || []),
        ...(newData?.results || [])
      ]

      this.setState({
        dataView: dataView,
        dataAll: dataView,
        count: newData?.count
      })



    }
    catch (err) {

      console.log("🚀 ~ file: HomePage.jsx ~ line 19 ~ HomePage ~ assignDataDetail ~ err", err)

    }
  }

  async assignData(params = {}) {

    try {


      nProgress.start()

      const {
        state: {
        },
        props: {

        }
      } = this



      const response = await getDataPeople(params)

      if (response.status == 200) {

        const newData = response?.payload
        console.log("🚀 ~ file: HomePage.jsx ~ line 99 ~ HomePage ~ assignData ~ newData", newData)

        await this.setState({
          newData,
          limit: newData.count
        })

        await this.assignDataDetail({ newData })


      }
      nProgress.done()

    }
    catch (err) {

      console.log("🚀 ~ file: HomePage.jsx ~ line 19 ~ HomePage ~ assignData ~ err", err)

    }
  }

  async handleEvent(type, dataDetails, index) {

    try {
      
      const {
        state: {
          page
        },
        props: {

        }
      } = this

      switch (type) {

        case 'refresh': {

          await this.assignData()

        } break

        case 'page': {


          await this.assignDataDetail({ page: page + 1 }, true)

          this.setState({
            page: page + 1
          })


        } break

        case 'direct-page-detail': {

          localStorage.setItem(index, JSON.stringify(dataDetails))
          window.open('/details/' + index, '_blank')

        } break



      }

    }
    catch (err) {

      console.log("🚀 ~ file: HomePage.jsx ~ line 62 ~ HomePage ~ handleEvent ~ err", err)

    }
  }


  async componentDidMount() {

    await this.assignData()

  }

  componentDidCatch(err, errInfo) {

    console.log("🚀 ~ file: HomePage.jsx ~ line 41 ~ HomePage ~ componentDidCatch ~ err, errInfo", err, errInfo)

  }

  render() {
    const {
      state: {
        dataView,
        page,
        itemPerPage,
        dataAll,
        count,
      },
      props: {

      }
    } = this

    return (
      <>

        <div className='templates-homepage'>

          {
            dataView?.length > 0 &&
            <div className='block-items'>
              <InfiniteScroll

                dataLength={page * itemPerPage}
                hasMore={page < (count - itemPerPage)}

                next={this.handleEvent.bind(this, 'page')}

                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                refreshFunction={this.handleEvent.bind(this, 'refresh')}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                  <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                  <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
              >
                {
                  dataView?.length > 0 &&
                  dataView.map((item, index) =>

                    <div className='card' key={'card-' + index} onClick={this.handleEvent.bind(this, 'direct-page-detail', item, (index+1))}>
                      <div className='card-head'>
                        <h2 className='text-title'>{item?.name}</h2>
                        <p>
                          <span>Born </span><span className='text-subtitle-1'>{item?.birth_year}</span>
                        </p>
                      </div>
                      <div className='card-detail'>
                        <h3>{item?.skin_color}</h3>
                        <p>{item?.hair_color}</p>
                      </div>
                    </div>


                  )
                }
              </InfiniteScroll>
            </div>
          }

        </div>
      </>
    )
  }
}
