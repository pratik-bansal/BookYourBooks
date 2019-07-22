import React from 'react';
import { BrowserRouter as Router, Link, Route, withRouter } from "react-router-dom";
import './App.css';
import Home from './Home';
import MainPage from "./MainActivity";
import SellBook from './SellBook';
import * as firebase from "firebase/app";
import "firebase/auth";

//////////// other js  file called //////////////////

import Bookdescription from './bookdescription';
import MyBooks from './MyBooks'
import Profile from './profile'
import axios from '../node_modules/axios';
import EditBook from './edit';

///////////firebase config ////////////////

var firebaseConfig = {
  apiKey: "AIzaSyC12fvV9HntTnYL_frlIoVbsJ3dNbOo_Ag",
  authDomain: "buysellapp-11ed7.firebaseapp.com",
  databaseURL: "https://buysellapp-11ed7.firebaseio.com",
  projectId: "buysellapp-11ed7",
  storageBucket: "",
  messagingSenderId: "493942678356",
  appId: "1:493942678356:web:42aa6df80ab4ff15"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { model1show: false, model2show: false, name: "", email: "", password: "", phone: "", uid: "", bookname: "", branch: "", semester: "", sellingprice: null, MRP: null, bookurl: "", sellername: "", sellerphone: "", sellerid: "", filterbranch: null, filtersemester: null, bid: null, bookimage: null }
    this.state.db = {
      books: [],
      mybooks: []
    }

  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///// show model in button  /////////////////////// 
  
  /////////// that concept use to call one component in other 

  showlogin() { /// show data in login  model
    let model1show = this.state.model1show;
    model1show = !model1show;
    this.setState(
      {
        model1show: model1show
      }

    )
  }




  showsignup() {/// signup data 
    let model2show = this.state.model2show;
    model2show = !model2show;
    this.setState(
      {
        model2show: model2show
      }

    )
  }

//////////////////////////////////////////////////////////////////////////////////


  handleChange(evt) {  //////// set the value in get 
    this.setState({ [evt.target.name]: evt.target.value });
  }


  handleselect(type, value) {
    if (type == "branch") {
      this.setState({
        branch: value
      })
    }
    if (type == "semester") {
      this.setState(
        {
          semester: value
        }
      )
    }
    if (type == "filterbranch") {

      this.setState({
        filterbranch: value
      })
    }
    if (type == "filtersemester") {
      this.setState({
        filtersemester: value
      })

    }




  }



  handlephoneChange(evt) { /// set the phone no length 
    var len = evt.target.value.length;
    if (len <= 10) {

      this.setState({
        phone: evt.target.value
      })
    }

  }

  ////// image uplode function ////////////

  fileUpload = (e) => {
    console.log(e.target.files[0])
    let fd = new FormData()
    fd.append("avatar", e.target.files[0])

    axios.post("/image", fd, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then((res) => {
      let l = "/" + res.data.filename;
      this.setState({
        bookimage: l
      })
      console.log()

    })

  }

  //////// checkuser in database /////// 

  checkuser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var email = user.email;
        this.setState({
          email: email
        })
        this.storeuserdata();
        this.books();

        this.props.history.push('/books/all');


      } else {
        // No user is signed in.

        this.props.history.push("/");
      }

    });

  }

///////////logout function ////////////

  logout = () => { 

    firebase.auth().signOut().then(() => {
      this.props.history.push("/");
    }).catch(function (error) {
      // An error happened.
    });
  }


  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      // ...
    });
  }

  signin() {

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.

      this.props.history.push('/books/all');
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);

      var errorMessage = error.message;
      // ...
    });
  }

  /////// called API to store the data into data base  //////////////////

  storeuserdata = () => {
    let obj = { name: this.state.name, email: this.state.email, phone: this.state.phone };
    axios.post('/user', obj)
      .then((res) => {
        this.setState(
          {
            name: res.data.name,
            email: res.data.email,
            uid: res.data._id,
            phone: res.data.phone
          }
        )
      })
  }


////////////// to store the seller information //////////////

  getseller = (uid, sid) => { 

    // console.log("call hua h getseller");
    // console.log(uid);
    axios.get("/seller/" + uid).then(
      (res) => {
        this.setState({
          sellername: res.data.name,
          sellerphone: res.data.phone

        })

        this.props.history.push("/bookdescription/" + sid);

      }

    )

  }

////////// store the books data use API ///////////////

  savebook = () => {
    console.log("simple wala");
    let obj = { branch: this.state.branch, semester: this.state.semester, bookname: this.state.bookname, sellingprice: this.state.sellingprice, MRP: this.state.MRP, uid: this.state.uid, bookurl: this.state.bookimage };
    axios.post("/savebook", obj).then((res) => {
      obj = res.data

      let db = this.state.db;
      let book1 = db.books;
      book1.push(obj);
      db.books = book1
      this.setState({
        db: db,
        branch: "",
        semester: "",
        bookname: "",
        sellingprice: 0,
        MRP: 0,
        bookimage: ""
      })
      this.props.history.push('/books/all');
    })
  }

///////////// update user profile informations //////////////////

  updateuser = () => {
    let obj = { uid: this.state.uid, name: this.state.name, email: this.state.email, phone: this.state.phone };
    axios.put('/updateuser', obj).then((res => { console.log(res) }))

  }

///////// google login function //////////////

  googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var user = result.user;
      this.setState({
        name: user.displayName
      })
      this.setState({
        email: user.email
      })


      this.props.history.push('/books/all');

      // ...
    }).catch(function (error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;

      var errorMessage = error.message;

      // The email of the user's account used.
      var email = error.email;


      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  //////// bookfilter function ////////////

  bookfilter = () => {

    let obj = { branch: this.state.filterbranch, semester: this.state.filtersemester };
    console.log(obj);
    axios.post("/bookfind", obj).then((res) => {

      let db = this.state.db;
      db.books = res.data;
      console.log(res.data);
      this.setState({
        db: db
      })
    })

  }

/////////// set the book data ///////////////////////

  books = () => {
    axios.get('/book')
      .then((res) => {

        let db = this.state.db;
        db.books = res.data;
        console.log(res.data);
        this.setState({
          db: db,

        })
      })

  }

  //////// find perticular user book data /////////////////

  getmybooks = () => {
    axios.get('/mybooks/' + this.state.uid)
      .then((res) => {

        let db = this.state.db;
        db.mybooks = res.data;
        console.log(res.data);
        this.setState({
          db: db
        })
      })
    this.props.history.push('/mybooks/' + this.state.uid);

  }

  ///////////// EDIT books user data function/////////////


  editbook = (bid) => {
    let mybooks = this.state.db.mybooks;
    var index = mybooks.findIndex(function (item, i) {
      return (item._id == bid)
    })
    let book = mybooks[index];
    this.setState({
      branch: book.branch,
      semester: book.semester,
      bookname: book.bookname,
      sellingprice: book.sellingprice,
      MRP: book.MRP,
      bid: book._id,
      bookimage: book.bookurl,
      uid: book.uid

    })

    this.props.history.push('/edit');
  }

  saveeditbook = () => {
    let obj = {
      branch: this.state.branch,
      semester: this.state.semester,
      bookname: this.state.bookname,
      sellingprice: this.state.sellingprice,
      MRP: this.state.MRP,
      bid: this.state.bid,
      _id: this.state.bid,
      bookurl: this.state.bookimage,
      uid: this.state.uid
    };
    this.setState({
      bookimage: ""
    })

    axios.post("/bookedit", obj).then((res) => {
      this.setState({
        bookimage: ""
      })


    })

    let db = this.state.db;
    let books = this.state.db.books;
    let mybooks = this.state.db.mybooks;
    var index = mybooks.findIndex(function (item, i) {
      return (item._id == obj.bid)
    })

    mybooks.splice(index, 1, obj);

    var index = books.findIndex(function (item, i) {
      return (item._id == obj.bid)
    })
    books.splice(index, 1, obj);

    db.books = books;
    db.mybooks = mybooks;
    this.setState({
      db: db
    });
    this.props.history.push('/mybooks/' + this.state.uid);
  }

  /////delete the data for perticular /////////

  deletebook = (bid) => {
    // console.log("delete book call hua h");
    axios.delete('/book/' + bid);
    let db = this.state.db;
    let mybooks1 = db.mybooks
    var index = mybooks1.findIndex(function (item, i) {
      return (item._id == bid)
    })
    mybooks1.splice(index, 1)
    db.mybooks = mybooks1

    let books1 = db.books
    var index = books1.findIndex(function (item, i) {
      return (item._id == bid)
    })
    books1.splice(index, 1)
    db.books = books1

    this.setState({
      db: db
    })

  }


  componentDidMount() {
    this.checkuser();

  }



  render() {

    return (<div>

      <Route path="/" exact render={() => <Home model1show={this.state.model1show} showlogin={this.showlogin.bind(this)} model2show={this.state.model2show} showsignup={this.showsignup.bind(this)} googleLogin={this.googleLogin} handleChange={this.handleChange.bind(this)} signup={this.signup.bind(this)} signin={this.signin.bind(this)} ></Home>} />
      <Route path="/books/all" exact render={() => <MainPage logout={this.logout} booke={this.books} getmybooks={this.getmybooks} username={this.state.name} getseller={this.getseller} books={this.state.db.books} handleselect={this.handleselect.bind(this)} bookfilter={this.bookfilter} filterbranch={this.state.filterbranch} filtersemester={this.state.filtersemester} ></MainPage>} />
      <Route path="/sellbook" exact render={() => <SellBook bookimage={this.state.bookimage} fileUpload={this.fileUpload} getmybooks={this.getmybooks} logout={this.logout} username={this.state.name} handleChange={this.handleChange.bind(this)} handleselect={this.handleselect.bind(this)} savebook={this.savebook} ></SellBook>} />
      <Route path="/profile" exact render={() => <Profile getmybooks={this.getmybooks} logout={this.logout} username={this.state.name} phone={this.state.phone} handleChange={this.handleChange.bind(this)} handlephoneChange={this.handlephoneChange.bind(this)} updateuser={this.updateuser} ></Profile>} />
      <Route path="/bookdescription/:id" exact render={(props) => <Bookdescription  {...props} getmybooks={this.getmybooks} logout={this.logout} username={this.state.name} books={this.state.db.books} sellername={this.state.sellername} sellerphone={this.state.sellerphone} ></Bookdescription>} />
      <Route path="/mybooks/:id" exact render={() => <MyBooks editbook={this.editbook} getmybooks={this.getmybooks} deletebook={this.deletebook} logout={this.logout} mybooks={this.state.db.mybooks} username={this.state.name} ></MyBooks>} />
      <Route path="/edit" exact render={() => <EditBook saveeditbook={this.saveeditbook} fileUpload={this.fileUpload} branch={this.state.branch} bookimage={this.state.bookimage} semester={this.state.semester} bookname={this.state.bookname} sellingprice={this.state.sellingprice} MRP={this.state.MRP} getmybooks={this.getmybooks} logout={this.logout} username={this.state.name} handleChange={this.handleChange.bind(this)} handleselect={this.handleselect.bind(this)} savebook={this.savebook} ></EditBook>} />

    </div>
    );
  }

}
export default withRouter(App);
