import React, { useState, useEffect } from 'react'
import './App.css'

let id = 0
const getId = () => ++id


const initialValues = {
  id: '',
  grocery: '', 
  completed: false
}

const initialGroceries = [
  {
    id: getId(), grocery: "Milk", completed: false
  },
  {
    id: getId(), grocery: "Eggs", completed: false,
  }
]


export default function App() {
  const [groceries, setGrocery] = useState(initialGroceries)
  const [editing, setEditing] = useState(null)
  const [formValues, setFormValues] = useState(initialValues)
  const [showCompleted, setShowCompleted] = useState(true)

 

  useEffect(() => {
   
    if (editing === null) {
      setFormValues(initialValues)
    } else {
      const editedGrocery = groceries.find(gr => gr.id === editing)
      setFormValues(editedGrocery)
    }
  }, [editing, groceries])

  const onChange = evt => {
  
    const { name , value , type, checked } = evt.target
    if(type === 'checkbox'){
      setFormValues({...formValues , [name]: checked})
    } else {
    setFormValues( {...formValues, [name] : value } )
  }
}
  const edit = id => {
    setEditing(id)
  }
  const submitNewGrocery = (name) => {
  
    const newGrocery = {...formValues ,  id: getId()}
    setGrocery([...groceries, newGrocery])
    setFormValues(initialValues)
  }
  const editExistingGrocery = () => {
   
    setGrocery(prevGroceries => prevGroceries.map(gr => {
      if(gr.id === editing) {
        return {...gr, ...formValues}
      }
      return gr
    }))
    setEditing(null)
  }

  const deleteGrocery = id => {
    setGrocery(groceries.filter(gr => gr.id !== id))
  }

  const toggleComplete = id => {
    setGrocery(prevGroceries =>
      prevGroceries.map(gr => {
        if(gr.id === id){
          return{...gr , completed: !gr.completed}
        }
        return gr 
      })
    )
  }

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  }

  const onSubmit = evt => {
    evt.preventDefault()
   if(!formValues.grocery.trim()){
    return
   }
   if(editing !== null) {
    editExistingGrocery()
   } else {
    submitNewGrocery()
   }
   setFormValues(initialValues)
  }
  return (
    <div>
      <div id="groceries">
        <h2>Grocery List</h2>
        <div>
          { groceries
          .filter(gr => showCompleted || !gr.completed)
          .map(gr => (
              <div key={gr.id} className="grocery">
                <div style={{ textDecoration: gr.completed ? 'line-through rgb(27, 127, 199) 2px'  : 'none' }}>
                  <h4>{gr.grocery}</h4>
                </div>
                <button className = 'button' onClick ={() => toggleComplete(gr.id)}>{!gr.completed ? 'Purchase' : '✔'}</button>
                <button className = 'button' onClick={()  => edit(gr.id)}>Edit</button>
                <button className = 'button' onClick ={() => deleteGrocery(gr.id)}>Delete</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="groceriesForm">
        <h2>{editing ? 'Edit' : 'Add'} a Grocery Item</h2>
        <form onSubmit={onSubmit} >
          <div>
            
            <input onChange={onChange} value={formValues.grocery} name="grocery" type="text" placeholder="Type Grocery Here" />
          </div>
          <div>
          <label>Purchased</label>
            <input
              type="checkbox"
              checked={formValues.completed}
              onChange={(onChange)}
              name="completed"
            />
            </div>
          <div>
            <input className = 'button' type="submit" />
          </div>
          <div>
            <button className = 'button' type="button" onClick = {toggleShowCompleted}>{ showCompleted ? 'Hide Purchased Items' : 'Show Purchased Items' } </button>
          </div>
        </form>
      </div>
    </div>
  )
}

