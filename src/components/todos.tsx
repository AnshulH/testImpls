import * as React from 'react';
import { useGetTodosQuery, useAddTodosMutation, useDeleteTodosMutation, useEditTodosMutation } from "../store/api";
import { useDispatch, useSelector } from "react-redux";
import { initTodos, addToTodoAction, deleteTodoAction, editTodoAction } from "../store/todoreducer";

const Todos = () => {
    const [textInput, setTextInput] = React.useState<string>('');
    const [editId, setEditId] = React.useState<number>(-1);
    const [editText, setEditText] = React.useState<string>('');

    const {todos, loading, init} = useSelector((state: any) => state.todos);
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetTodosQuery();
    const [addTodoMutation] = useAddTodosMutation();
    const [deleteTodoMutation] = useDeleteTodosMutation();
    const [editTodosMutation] = useEditTodosMutation();

    if (!isLoading && !init) {
        dispatch(initTodos({todos: data, loading: isLoading, init: true}));
    }

    const getInputText = (event: any) => {
        setTextInput(event.target.value);
    }

    const submitEvent = async (text: string) => {
        const val = await addTodoMutation({id: String(Math.floor(100 * Math.random())), text: text}).unwrap();
        if (val) {
            dispatch(addToTodoAction({id: val.id, text: val.text}));
            setTextInput('');
        }
    }

    const deleteTodo = async (id: string) => {
        const val = await deleteTodoMutation({id: id});
        if (val) {
            dispatch(deleteTodoAction({id: id}));
        }
    }

    const toggleEdit = async (id: number) => {
        setEditId(id);
    }

    const getEditText = (event: any) => {
        setEditText(event.target.value);
    }

    const constEditTodo = async (id: string, newText: string, currentText: string) => {
        if (newText === '') {
            setEditId(-1);
            return;
        }

        const val = await editTodosMutation({id: id, text: newText});
        if (val) {
            dispatch(editTodoAction({id: id, text: newText}));
        }
        setEditId(-1);
        setEditText('');
    }

    return (
        <div className="todo-container">
            {loading ? 
                (<div> Loading... </div>) : 
                (   <div className="item-container"> 
                        <h1> Todos </h1>
                        <div className="input-box">
                            <input onChange={getInputText} value={textInput}></input> 
                            <button onClick={async () => await submitEvent(textInput)}> Submit </button>
                        </div>
                        {todos.map((todo: any) => {
                            const isEdit = todo.id === editId
                            return !isEdit ? (
                                <div id={todo.id} key={todo.id} className="individual-item"> {todo.text} 
                                    <button onClick={async () => {await toggleEdit(todo.id)}}> Edit </button>
                                    <button onClick={async () => {await deleteTodo(todo.id)}}> Delete </button>
                            </div>) : 
                            (<div className="edit-box">
                                <input onChange={getEditText} value={editText} />
                                <button onClick={async () => {await constEditTodo(todo.id, editText, todo.text)}}> Change </button>
                            </div>)
                        })}
                    </div>
                )
            }
         </div>
    );
}

export default Todos;