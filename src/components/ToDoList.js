import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useContext,useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export default function ToDoList() {

    const {todoValue,setTodo}=useContext(TodoContext);
    const [inputValue,setInputValue]=useState("");
    const [handleTasks,setHandleTasks]=useState("all");

    useEffect(()=>{
        const getTodos=JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodo(getTodos);
    },[])
    function handleRenderTasks(e){
        setHandleTasks(e.target.value);
    }
    function handleAddClick(){
        const newTodo=
            {
                id:uuidv4(),
                title:inputValue, 
                details:"",
                flag:false
            };
            const newTodoVal=[...todoValue,newTodo];
        setTodo(newTodoVal);
        localStorage.setItem("todos",JSON.stringify(newTodoVal))
        setInputValue("")
    }
    const compoletedFiltering=todoValue.filter((t)=>{
        return t.flag
    })
    const notCompoletedFiltering=todoValue.filter((t)=>{
        return !t.flag
    })
    let choseingRenderList=todoValue;
    if(handleTasks=="notCompoleted"){
        choseingRenderList=notCompoletedFiltering;
    }
    else if(handleTasks=="compoleted"){
        choseingRenderList=compoletedFiltering;
    }
    const ToDosMaping=choseingRenderList.map((t)=>{
        return <ToDo key={t.id} todo={t}/>
    })
    return (
        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275  }} style={{maxHeight:"80vh",overflow:"scroll"}}>
                <CardContent>
                    <Typography variant="h1" style={{fontWeight:"bold"}}>مهامي</Typography>
                    <Divider style={{ marginTop: "-14px" }} />

                    {/* filter buttons */}
                    <ToggleButtonGroup
                        exclusive
                        aria-label="text alignment"
                        style={{direction:"ltr", marginTop:"25px"}}
                        value={handleTasks}
                        onChange={handleRenderTasks}
                    >
                        <ToggleButton value="notCompoleted">
                            غير منجز
                        </ToggleButton>
                        <ToggleButton value="compoleted" >
                            منجز
                        </ToggleButton>
                        <ToggleButton value="all" >
                            الكل
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {/* filter buttons */}
                    {/*All Todos*/}
                    {ToDosMaping}
                    {/*All Todos*/}

                    {/* input button */}
                    <Grid style={{marginTop:"15px"}} container spacing={2}>
                        <Grid  size={8}>
                        <TextField value={inputValue} onChange={(e)=>{
                            setInputValue(e.target.value)
                        }} style={{width:"100%"}} id="outlined-basic" label="إضافه مهمه" variant="outlined" />
                        </Grid>
                        <Grid size={4}>
                        <Button onClick={()=>{
                            handleAddClick();}}
                            style={{width:"100%",height:"100%"}}
                            disabled={inputValue.length<3} variant="contained">إضافه</Button>
                            
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
