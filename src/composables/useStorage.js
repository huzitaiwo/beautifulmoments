import { storage } from '../firebase/config'

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = storage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }

  return { uploadImage, url, filePath, error }
}

export default useStorage;