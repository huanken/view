import React, { Component } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import * as session from 'common/helpers/session'
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleDateString('vi-VN',),
      time: new Date().toLocaleTimeString()
    }
  }
  handleLogout () {
    session.remove()
    window.location.href = '/auth'
  }

  incrementCount () {
    this.setState({
        date: new Date().toLocaleDateString('vi-VN',),
        time: new Date().toLocaleTimeString()
    })
  }

  convertTextAddress (address) {
    const text = `${address.substring(0, 4)}...${address.substring(address.length - 3, address.length)}`
    return text
  }

  componentDidMount() {
    setInterval(() => {
     this.incrementCount()
    }, 1000);
  }

  render () {
    const { profile, loading } = this.props
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return (
      <Navbar bg='dark' variant='dark' className='header'>
        <Navbar.Brand href="/">
        <img
          src="https://lh3.googleusercontent.com/bDz-bl446zUxFxrpRPtTRyq4ibsWSXPjmfFcUu9NathLnPgxEHKvQCGRah85pVEwv6126iJNB9d0Zyp1Cbav_S6xEPcOwREA1FmEEA61S3JjXIdQwYJPt_Ym3xmXHQ5aI_PskaCUyrRytRtM9uQPr_Y5hFVT-frazeVpSPxw7JiXXPpYFwPED9stcpi-uhhNQlfW-TXPf821ra3Qjdi6MrBENe5DUtqGSUlmitVs3aL8hK7I7fHIYaMtL20CQ8SYSNVyOukJ6u-OZg19XiEpI_aGDMh9DX7b_61SwVaSas3ZRIi_5Hg4XHMQ4UCOuMdptIs5_TAKqmoC8l9iCJipK5C2k6Eyqmxnii-PtcrU-eWzgBrWL727sncesvUOmpiHFHMi59o4vhUXPxf4qoXvBTGMLG0glOLiQqbi_8pN_KKkXgbuCVg61RyjXax4NNb5x2rGh38bbBVHztF1L7X12CW_aSrId4eIEui-dLTMYHrH4v1VClwGVOUzBdGScjqP0Y3JWDLTmb_7PDds90K1G0e2y4p_FPpGYC-cKgN2WZ62IeGsB8eAbpVlifNeV3MHnwdnkJDuxqPEOqY679w4SrJbp_VMY0lDQe43scJ6jivu2P-f4aETJj867HgK-lpJmAtLI43YsFCl4S6kq5rO-aHW9qr5MqWpaVhhS88bPcwzIgtkSH4hmTiIjxAwUmIKe0bVxVzMhDChd_BO2tdVehM=s225-no?authuser=0"
          width="38"
          height="38"
          className="d-inline-block align-top"
          alt="Logo"
        />
       </Navbar.Brand>
        <a href='/' className='navbar-brand'>
          Documents Manager
        </a>
        <a style={{color:"white",paddingTop:4}}>{this.state.date}</a>
        <a style={{color:"white",paddingTop:4,marginLeft:10,marginRight:10}}>{this.state.time}</a>
        <Nav className='mr-auto' />
        {loading !== 0 ? (<div className='spinner-border text-primary' />) : null}
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text className='ml-auto pr-md-5 navbar-nav'>
            Signed in as: <a href='/profile'>
              {profile && this.convertTextAddress(profile.address)}
            </a>{' '}
            <Button
              variant='outline-light'
              size='sm'
              onClick={this.handleLogout}
              title='Logout'
              style={{marginLeft:10}}
            >
              <i className='fa fa-sign-out' aria-hidden='true' />
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}