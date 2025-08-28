import { useState } from 'react'
import axios from 'axios'
import './app.css'
import PatientList from './components/patient-list'

function App() {
  return <div>
    <PatientList />
  </div>

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select an MP3 file first.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      setUploading(true)
      setMessage('Uploading...')
      const response = await axios.post('http://localhost:3000/patients/1/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setMessage(`Upload successful: ${response.data.message || 'File uploaded!'}`)
    } catch (error: any) {
      console.error(error)
      setMessage(`Upload failed: ${error.response?.data?.message || error.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="App">
      <h1>Upload MP3</h1>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App
