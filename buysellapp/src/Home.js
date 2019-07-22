import React from 'react';
import { Navbar, Nav,Form,Button,ButtonGroup,Carousel,Modal} from '../node_modules/react-bootstrap';
import {List,Grid,Header,Segment,Container} from 'semantic-ui-react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import logo1 from './logo1.png';



function Home({model1show,showlogin,model2show,showsignup,googleLogin,handleChange,signup,signin}) {
  return(
    <div>
    <Navbar bg="dark" variant="dark">
     <Navbar.Brand href="#home">
      <img
        alt="logo"
        src={logo1}
        width="65"
        height="40"
        className="d-inline-block align-top"
      />
     {'Book Your Book'}
    </Navbar.Brand>
    <Nav className="ml-auto">
    <ButtonGroup className="mr-3" aria-label="Second group">
    <Button
          variant="success"
          onClick={()=>{showlogin()}} 
        >
         
          Login 
       

        </Button>

        <Modal
        show={model1show}
        onHide={showlogin}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
            <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address  </Form.Label>
    <Form.Control  onChange={handleChange} name="email" type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
  </Form.Group>
 
  <Button variant="primary"  onClick={()=>{signin()}}>
  
    Submit
   
  </Button>

  <br />
  <br />
  <Button variant="warning" onClick={googleLogin} >Login With Google</Button>
</Form>
        </Modal.Body>
      </Modal>


   
  </ButtonGroup>

   
  <Button 
          variant="info"
          onClick={()=>{showsignup()}} 
        >
          Sign Up
        </Button>

        <Modal
        show={model2show}
        onHide={showsignup}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign Up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

  <Form.Group controlId="formBasicEmail">
    <Form.Label >User Name</Form.Label>
    <Form.Control onChange={handleChange} name="name" type="text" placeholder="Enter Name" />
  </Form.Group>

  
  <Form.Group controlId="formBasicEmail">
    <Form.Label >Email address</Form.Label>
    <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label >Password</Form.Label>
    <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label >Phone number</Form.Label>
    <Form.Control onChange={handleChange}type="text" name="phone" placeholder="Password" />
  </Form.Group>
  </Form>
  <Button  onClick={()=>{signup()}}  variant="primary" >
    Submit
  </Button>

        </Modal.Body>
      </Modal>

    
      
    </Nav>
  </Navbar>
  <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      height="570"
      alt="First slide"
      src="https://cdn2.theweek.co.uk/sites/theweek/files/2019/01/wd-books_-_joel_sagetafpgetty_images.jpg"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      alt="Second slide"
      height="570"
      src="https://files.realpython.com/media/The-Best-Books-for-Python-Beginners_Watermarked.530f76514c63.jpg"
    
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      alt="Third slide"
      height="570"
      src="https://panmacmillan.azureedge.net/pmk11/panmacmillan/files/media/panmacmillan/blogs-2018/best-crime-thriller-books-2019-header-min.jpg"
    />

  </Carousel.Item>
</Carousel>
<Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
             
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


export default Home;
