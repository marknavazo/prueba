import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { stringify } from 'query-string';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  withAuthorization,
  withEmailVerification,
} from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import Loading from '../../components/Loading';
import * as ROUTES from '../../constants/routes';
import GLOBAL from '../../constants/global';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
      currentPage: 1,
      loadingMore: false,
      totalPages: 1,
    };
  }

  componentDidMount() {
    document.title = `${GLOBAL.TITLE} - Listado de Usuarios`;
    const { firebase, onSetUsers } = this.props;
    firebase.users().on('value', snapshot => {
      onSetUsers(snapshot.val());
    });
    this.getUsers();
  }

  getUsers() {
    const { currentPage } = this.state;
    const query = {
      page: JSON.stringify(currentPage),
      per_page: 5,
    };
    const url = `${GLOBAL.API_URL}/users?${stringify(query)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.addUsers(data));
    const nextPage = currentPage + 1;
    this.setState({ currentPage: nextPage });
  }

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({ loadingMore: true });
      this.getUsers();
    }, 1500);
  };

  addUsers(newUsers) {
    const { users } = this.state;
    const newData = users;
    newUsers.data.map(user => newData.push(user));
    this.setState({
      users: newData,
      loadingMore: false,
      loading: false,
      totalPages: newUsers.total_pages,
    });
  }

  render() {
    const {
      loading,
      loadingMore,
      users,
      currentPage,
      totalPages,
    } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <div id="list">
        <MDBContainer className="margin_bottom">
          <MDBRow>
            <MDBCol size="8" className="text-left mb50">
              <h2>Listado de Usuarios</h2>
            </MDBCol>
            <MDBCol size="4" className="text-right mb50">
              <Link to={`${ROUTES.NEW_USER}`} className="add__user">
                <span>Añadir Usuario</span>
                <i className="far fa-plus-square" />
              </Link>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol
              xl="6"
              lg="8"
              md="12"
              className="offset-xl-3 offset-lg-2 offset-md-0"
            >
              <InfiniteScroll
                dataLength={users.length}
                next={this.fetchMoreData}
                hasMore={!(currentPage > totalPages)}
                loader={<Loading />}
              >
                {users.map((item, i) => (
                  <div className="user" key={`${i + 1}`}>
                    <img src={item.avatar} alt={item.first_name} />
                    <div className="user__data">
                      <div className="id__user text-right">
                        <b>{`#${item.id}`}</b>
                      </div>
                      <h3>
                        {`${item.first_name} ${item.last_name}`}
                      </h3>
                      <h4>{item.email}</h4>
                    </div>
                    <Link to={`${ROUTES.LIST}/${item.id}`}>
                      <i className="fas fa-user-edit" />
                    </Link>
                  </div>
                ))}

                {loadingMore && <Loading />}
              </InfiniteScroll>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

ListPage.propTypes = {
  firebase: PropTypes.object,
  onSetUsers: PropTypes.func,
};

const mapStateToProps = state => ({
  users: state.userState.users,
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEmailVerification,
  withAuthorization(condition),
)(ListPage);
