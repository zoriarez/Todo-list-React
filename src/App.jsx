import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { TodoUpdateDialog } from './components/TodoUpdateDialog'
import TodoCard from './components/TodoCard';
import { Button, TextField, Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle,Box } from '@mui/material';


function App() { 
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("Todos")) ?? []
  })
  const [todo, setTodo] = useState({
    id:null,
    title:"",
    description:""
  })



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos))
  }, [todos])
  
  const handleSumbmit = e =>{
    e.preventDefault()
    if(todo.title.length === 0 || todo.description.length === 0){
      toast.error('All fields are required!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }else{
      setTodos(currentTodo => {
        return [
          ...currentTodo,
          {id: crypto.randomUUID(), title: todo.title,description: todo.description, isCompleted:false},
        ]
      })
      toast.success('Todo has been added!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTodo({
        id:null,
        title:"",
        description:""
      })
    }
    handleClose() 
  }
 
  const handleUpdateClick = id => {
    const tempTodos = [...todos]
    todos.map(todoArray => {
      if(todoArray.id === id){
        todoArray.title = todo.title
        todoArray.description = todo.description
      }
      return todo
    })
    setTodos(tempTodos)
    setTodo({
      id:null,
      title:"",
      description:""
    })
  }
    
  const handleDeleteClick = id => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  const handleToggleCompleted = id => {
    const tempTodos = [...todos]
    todos.map(todo => {
      if(todo.id === id){
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    setTodos(tempTodos)
  }

  const handleEditClick = props => {
    setTodo(props)
  }

  const handleDialogClose = () => {
    setTodo({
      id:null,
      title:"",
      description:""})
  }
  


  return (
    <>
    
  

<div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Title
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="what do you want to do"
            type="text"
            fullWidth
            variant="standard"
            value={todo.title} 
            onChange={e => setTodo({...todo, title: e.target.value})}
          />
          
          <DialogContentText>
           Description
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Describe what it is"
            type="text"
            fullWidth
            variant="standard"
            value={todo.description}
            onChange={e => setTodo({...todo, description:e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSumbmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>        

    <TodoUpdateDialog 
      todo={todo}
      setTodo={setTodo}
      handleDialogClose={handleDialogClose}
      handleUpdateClick={handleUpdateClick}
    />
      
      <TodoCard
              todos={todos}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              handleToggleCompleted={handleToggleCompleted}
            />


  
        
    </>
  )
}

export default App

