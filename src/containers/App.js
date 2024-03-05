import React, {Component} from "react";
import Cardlist from "../components/Cardlist";
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

class App extends Component {
    constructor(){
        super()
        this.state = {
            cats : [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({cats: users}))
        
    }
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value})
    }
    render(){
        const {cats, searchfield} = this.state
        const filterRobots = cats.filter(cat => {
            return cat.name.toLowerCase().includes(searchfield.toLowerCase())
        }) 
        return (cats.length === 0 )? //Loading When no data
        <h1>Loading</h1> :
        (
            <div className="tc">
                <h1 className="f1">Cat Profile</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <Cardlist robots={filterRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        )
    }
    
        
    
}

export default App