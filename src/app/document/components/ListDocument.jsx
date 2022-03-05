import React, { Component } from 'react'
import { Table, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { convertTimeStampToString } from 'common/utils'
import { statusDocument } from 'common/helpers/const'
import { connect } from 'react-redux'
import {
  getSumary
} from '../reducer'
import Pagination from '../components/Pagination'
class ListDoc extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1
    }
  }

  componentDidMount(){
    this.props.getSumary()
  }

  render () {
    let { documents } = this.props
    const {sumary} = this.props
    const size = 5
    const start = (this.state.currentPage - 1) * size
    const end = this.state.currentPage * size
    documents = documents.slice(start,end);
    const paginate = pageNum => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: this.state.currentPage == 10 ?  this.state.currentPage : this.state.currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: this.state.currentPage === 1 ?  this.state.currentPage : this.state.currentPage - 1 });


    return (
      <>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th style={{ width: '90px' }}>Status</th>
            <th style={{ width: '120px' }}>Category</th>
            <th style={{ width: '150px' }}>Upload at</th>
          </tr>
        </thead>
        <tbody>
          {documents.length > 0 ? documents.map((doc, index) => {
            return (
              <tr key={index}>
                <td>{doc.id}</td>
                <td>
                  <Link to={`/document/${doc.id}`}>
                    {doc.name}
                  </Link>
                </td>
                <td>{doc.owner}</td>
                <td >
                  {statusDocument[doc.status] && <Badge
                    pill
                    variant={statusDocument[doc.status].class}
                  >
                    {statusDocument[doc.status].status}
                  </Badge>
                  }
                </td>
                <td>{doc.category_name}</td>
                <td>{convertTimeStampToString(doc.created_at)}</td>
              </tr>
            )
          }) : null}
        </tbody>
      </Table>
      {documents.length > 0 ? sumary && 
         <Pagination 
         totalPage={sumary.document/size - parseInt(sumary.document/size) === 0 ? parseInt(sumary.document/size) : parseInt(sumary.document/size) + 1}
         paginate={paginate} 
         nextPage={nextPage} 
         prevPage={prevPage} /> 
         : <a>No documents found</a>
      }      
    </>
    )
  }
}


const mapStateToProps = state => {
  return {
    sumary: state.home.sumary,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSumary: () => dispatch(getSumary())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDoc)
