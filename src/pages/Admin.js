import React, { useRef, useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "firebase-functions";

function Admin() {
  const [userOption, setUserOption] = useState();
  const [bColor, setBColor] = useState();
  const [fColor, setFColor] = useState();
  const [sfColor, setSFColor] = useState();
  const [userdata, setUserData] = useState([]);
  const firestore = firebase.firestore();

  useEffect(() => {
    // Update the document title using the browser API

    firestore
      .collection("css-users")
      .get()
      .then((querySnapshot) => {
        let documents = querySnapshot.docs.map((doc) => doc.data());
        // do something with documents
        console.log(documents);
        setUserData(documents);
        console.log(userdata);
        userdata.map((d) => console.log(d.email));
      });
  }, []);

  function handleChange(event) {
    console.log(event.target);
    console.log(event.target.value);
    setUserOption(event.target.value);
  }

  function handleBChange(event) {
    console.log(event.target);
    setBColor(event.target.value);
  }
  function handleFChange(event) {
    setFColor(event.target.value);
  }

  function handleSFChange(event) {
    setSFColor(event.target.value);
  }

  function handleSubmit() {
    console.log(userOption);
    console.log(bColor);
    console.log(fColor);

    firestore
      .collection("cssData")
      .doc(userOption)
      .set({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: bColor,
        fColor: fColor,
        sColor: sfColor,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <div className="App">
      {userdata.length > 0 ? (
        <div>
          <h2>Please select user email</h2>
          <select name="DocOption" onChange={handleChange}>
            <option key="disabled" value="No value" disabled selected={true}>
              Please select user email
            </option>
            {userdata.map((doc) => (
              <option key={doc.uid} value={doc.uid}>
                {doc.email}
              </option>
            ))}
          </select>
          <br />
          <h2>Please select Background Color</h2>
          <select name="BColor" onChange={handleBChange}>
            <option key="Red" value="#FF0000">
              Red
            </option>
            <option key="blue" value="#0000FF">
              blue
            </option>
            <option key="purple" value="#800080">
              purple
            </option>
          </select>
          <br />
          <h2>Please select Received Font Color</h2>
          <select name="FColor" onChange={handleFChange}>
            <option key="Red" value="#FF0000">
              Red
            </option>
            <option key="blue" value="#0000FF">
              blue
            </option>
            <option key="purple" value="#800080">
              purple
            </option>
          </select>
          <h2>Please select Sent Font Color</h2>
          <select name="SFColor" onChange={handleSFChange}>
            <option key="Red" value="#FF0000">
              Red
            </option>
            <option key="blue" value="#0000FF">
              blue
            </option>
            <option key="purple" value="#800080">
              purple
            </option>
          </select>
          <br />
          <br />
          <button onClick={handleSubmit}>Save</button>
        </div>
      ) : (
        <h1>
          The application has no user data. Please sign in and try accessing
          admin page. Thanks!
        </h1>
      )}
    </div>
  );
}

// class MyForm extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = { username: "" };
//     const firestore = firebase.firestore();
//     firestore
//       .collection("documents")
//       .get()
//       .then((querySnapshot) => {
//         const documents = querySnapshot.docs.map((doc) => doc.data());
//         // do something with documents
//         console.log(documents);
//       });
//   }

//   const [option,setOption] = useState();

//   function handleChange(event){
//       setOption(event.target.value)
//   }

//   mySubmitHandler = (event) => {
//     event.preventDefault();
//     alert("You are submitting " + this.state.username);
//   };
//   myChangeHandler = (event) => {
//     this.setState({ username: event.target.value });
//   };

//   render() {
//     return (
//       <form onSubmit={this.mySubmitHandler}>
//         <h1>Hello {this.state.username}</h1>
//         <p>Choose email</p>
//         <select value={this.state.mycar}>
//           <option value="Ford">Ford</option>
//           <option value="Volvo">Volvo</option>
//           <option value="Fiat">Fiat</option>
//         </select>
//         <input type="submit" />
//       </form>
//     );
//   }
// }

// ReactDOM.render(<MyForm />, document.getElementById("root"));

export default Admin;
