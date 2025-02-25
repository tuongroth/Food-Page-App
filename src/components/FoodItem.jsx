const FoodItem = ({ food, toggleAvailability }) => {
    return (
      <li>
        {food.name} - {food.available ? "Available" : "Out of stock"}
        <button onClick={toggleAvailability}>
          Toggle Availability
        </button>
      </li>
    )
  }
  
  export default FoodItem
  