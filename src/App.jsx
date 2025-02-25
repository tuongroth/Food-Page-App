import { useState, useEffect, useRef } from 'react'
import FoodItem from './components/FoodItem'
import Notification from './components/Notification'
import Footer from './components/Footer'
import foodService from './services/food'
import Togglable from './components/Togglable'
import FoodForm from './components/FoodForm'

const App = () => {
  const [foodItems, setFoodItems] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const foodFormRef = useRef()

  useEffect(() => {
    foodService.getAll().then(initialFoodItems => {
      setFoodItems(initialFoodItems)
    })
  }, [])

  const toggleAvailabilityOf = id => {
    const food = foodItems.find(f => f.id === id)
    const changedFood = { ...food, available: !food.available }

    foodService.update(id, changedFood)
      .then(returnedFood => {
        setFoodItems(foodItems.map(f => f.id !== id ? f : returnedFood))
      })
      .catch(error => {
        setErrorMessage(`Món '${food.name}' đã bị xóa khỏi hệ thống`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addFood = (foodObject) => {
    foodFormRef.current.toggleVisibility()
    foodService.create(foodObject)
      .then(returnedFood => {
        setFoodItems(foodItems.concat(returnedFood))
      })
  }

  const foodItemsToShow = showAll ? foodItems : foodItems.filter(food => food.available)

  return (
    <div>
      <h1>Food Delivery</h1>
      <Notification message={errorMessage} />

      <Togglable buttonLabel="Thêm món ăn" ref={foodFormRef}>
        <FoodForm createFood={addFood} />
      </Togglable>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Hiển thị {showAll ? 'còn hàng' : 'tất cả'}
        </button>
      </div>

      <ul>
        {foodItemsToShow.map(food => (
          <FoodItem
            key={food.id}
            food={food}
            toggleAvailability={() => toggleAvailabilityOf(food.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App
