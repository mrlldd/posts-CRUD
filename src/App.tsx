import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Details from "./components/Details/Details";
import Home from "./components/Home/Home";
import PostEditor from "./components/PostEditor/PostEditor";
import {Button, ButtonGroup, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";


const queryClient = new QueryClient();

const darkTheme = createTheme({palette: {mode: 'dark'}})

function Header() {
    const navigate = useNavigate();
    return <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: '1rem'
    }}>
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("/create")}>Create</Button>
    </ButtonGroup>
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Container>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path='/home' element={<Home/>}/>
                                <Route path='/create' element={<PostEditor post={{}}/>}/>
                                <Route path='/details/:id' element={<Details/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/home" replace/>}
                            />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
