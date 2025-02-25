import { useState } from 'react'

const FoodForm = ({ createFood }) => {
  const [name, setName] = useState('')
  const [available, setAvailable] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()
    createFood({ name, available })
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Available: <input type="checkbox" checked={available} onChange={() => setAvailable(!available)} />
      </div>
      <button type="submit">Add Food</button>
    </form>
  )
}

export default FoodForm
