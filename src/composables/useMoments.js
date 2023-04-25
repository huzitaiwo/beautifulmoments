import { addDoc, collection } from 'firebase/firestore'
import { storage, firestore, timestamp } from '../firebase/config'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";


const useMoments = (store, { title, details, thumbnail }) => {
  const collectionRef = collection(firestore, "moments")
  // upload user thumbnail
  const storageRef = ref(storage, `thumbnails/moments/${thumbnail.name}`);
  const uploadTask = uploadBytesResumable(storageRef, thumbnail);

  uploadTask.on(
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // add data to moments collection
        addDoc(collectionRef, {
          title,
          details,
          createdAt: timestamp,
          thumbnail: downloadURL,
          uid: store.state.user.uid
        })
      });
    }
  );

}

export default useMoments