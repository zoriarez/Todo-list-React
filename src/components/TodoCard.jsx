
import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle,Box } from '@mui/material';
export default function TodoCard(props) {
    return (
        <> 
            <Box key={props.todo.id}  sx={{
                
                width: 300,height: 100,backgroundColor: 'primary','&:hover': {backgroundColor: 'cyan',opacity: [0.9, 0.8, 0.7],
        },
      }}>
                <Box  className='text-center'>
                        <Box>
                            {props.todo.title}
                        </Box>
                        <Box>
                            {props.todo.description}
                        </Box>
                    </Box>
                    <Box className='flex gap-1 justify-center'>
                    <Button  onClick={() => props.handleEditClick(props.todo)}>Edit</Button>
                    <Button  onClick={() => props.handleDeleteClick(props.todo.id)}>Delete</Button>
                    <Button color={props.todo.isCompleted ? 'success':'error'} variant='outlined' onClick={() => props.handleToggleCompleted(props.todo.id)}>{props.todo.isCompleted ? "Completed" : "Incomplete"}</Button>
                </Box>
            </Box>
       

        </>
    )
}
