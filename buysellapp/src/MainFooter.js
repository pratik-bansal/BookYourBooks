import React from 'react';
import { List, Grid, Header, Segment, Container } from 'semantic-ui-react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";







function MainFooter({ logout }) {
  return (
    <div>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <Link to="/books/all">
                    <List.Item as='a'>Home</List.Item>
                  </Link>
                  <List.Item as='a'>Contact Us</List.Item>
                  <Link to="/profile">
                    <List.Item as='a'>Profile</List.Item></Link>

                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <Link to="/sellbook">
                    <List.Item as='a' >Sell Books</List.Item>
                  </Link>
                  <List.Item as='a'>Buy Books</List.Item>
                  <List.Item as='a' onClick={logout} >LogOut</List.Item>

                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                 Motivation 
              </Header>
                <p>
                 Now you can easily sell your Books Online to Juniors.
              </p>
              </Grid.Column>

              <Grid.Column width={3}>
                <Header inverted as='h4' content='Developed By' />
                <List link inverted>
                  <a href="https://www.linkedin.com/in/pratik-b-7961a5138/">@Pratik Bansal</a>
                  <br />
                  {/* <List.Item as='a'>@Pratik Bansal</List.Item> */}
                  <a href="https://www.linkedin.com/in/himanshumodi33/">@Himanshu Modi</a>
                  {/* <List.Item as='a'>@Himanshu Modi</List.Item> */}

                </List>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}


export default MainFooter;