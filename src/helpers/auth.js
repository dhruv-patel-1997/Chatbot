import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log(auth.currentUser.uid);
      setUid(auth.currentUser.uid);
      if (auth.currentUser !== null) {
        // Add to  users collection
        const userCollectionRef = firestore
          .collection("css-users")
          .doc(auth.currentUser.uid);
        console.log(userCollectionRef);

        if (userCollectionRef !== undefined) {
          firestore
            .collection("css-users")
            .doc(auth.currentUser.uid)
            .set({
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
        // End add to user
        //classes = useNewStyles();
      }
      setLogedIn(true);
    });
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}

export function logout() {
  return auth().signOut();
}
