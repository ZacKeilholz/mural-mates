import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import Counter from "../../components/Counter";
import JoinMural from "../../components/JoinMural";
import Carousel from "../../components/Carousel";
import "./Home.css";
import API from "../../utils/API";
import {
  Segment,
  Button,
  Divider,
  Container,
  Header,
  Icon,
  Grid,
  Message,
  Form,
  Image,
  Menu,
  Tab
} from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      loggedIn: false,
      willJoin: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.auth.isAuthenticated() &&
      prevState.loggedIn == false &&
      this.state.loggedIn == false
    ) {
      this.populateProfile();
    }
  }

  populateProfile() {
    let authorized = this.props.auth.isAuthenticated();
    if (authorized) {
      this.setState({ profile: {}, loggedIn: true });
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
          this.props.callbackFromParent(true);
        });
      } else {
        this.setState({ profile: userProfile });
        this.props.callbackFromParent(true);
      }
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
    this.setState({ loggedIn: false });
    this.props.callbackFromParent(false);
  }
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const willJoin = this.state.willJoin;
    let openMurals;

    return (
      <div>
               <Grid
              id="mural-selection"
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Row>
               {!isAuthenticated() ? (
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment stacked>
                      <Header as="h1" color="grey" textAlign="center">
                        <Image>
                          <i className="fas fa-skull" />{" "}
                        </Image>
                        Welcome to Mural Mates
                      </Header>
                      <Segment stacked>
                        <Button
                          className="inverted"
                          color="black"
                          fluid
                          size="large"
                          name="logIn"
                          className="btn-margin"
                          onClick={this.login.bind(this)}
                        >
                          Log In
                        </Button>
                      </Segment>
                    </Segment>
                  </Grid.Column>
                ) : (
                  <Grid.Column>
                    <Segment stacked>
                      <Link to={`/about`}>
                      
                        <Button
                          color="grey"
                          fluid
                          size="large"
                        >How To Play</Button>
                      </Link>
                      <Divider horizontal />
                       <Link to={`/game/`}><Button color="black" fluid size="large">
                       Create New Mural
                      </Button></Link>
                      <Divider horizontal>Or</Divider>
                      <Button
                        color="blue"
                        fluid
                        size="large"
                        onClick={this.handleWillJoin}
                      >
                        Join Open Murals
                      </Button>
                    </Segment>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          
      </div>
    );
  }
}

export default Home;


