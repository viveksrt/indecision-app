import React from 'react';
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'
import Action from './Action'
import OptionModal from './OptionModal'


export default class IndecisionApp extends React.Component {
    state = {
        "options":[],
        "selectedOption": undefined
    }

    componentDidMount(){
        console.log("componentDidMount");
        const options = JSON.parse(localStorage.getItem("options"));
        if(options) {
        this.setState(()=> ({options}));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            console.log("saving Data");
            localStorage.setItem("options", JSON.stringify(this.state.options))
        }
    }

    componentWillUnmount(){ 
        console.log("componentWillUnmount")
    }

    handleDeleteAllOptions = () => {
        this.setState(() => ({"options":[]}))
    }

    handleClearOptionSelection = () => {
        this.setState(() => ({"selectedOption": undefined}));
    }

    handleDeleteOption = (option) => {
        this.setState((prevState) => {
            const index = prevState.options.indexOf(option);
            let newOptions = prevState.options;
            if (index > -1) {
                  newOptions.splice(index,1); 
            }
            return {
            "options": newOptions
        }
        });
    }

    handlePickAction = () => {
        const index = Math.floor(Math.random()* this.state.options.length);
        const option = this.state.options[index];
        this.setState(()=>({
            "selectedOption": option
        }));
    }

    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists';
        }
        this.setState((prevState) => ({
                "options": prevState.options.concat([option])
            })
        );
    }

    render (){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer!';
        return (
        <div>
            <Header title = {title} subtitle ={subtitle}/>
            <div className = 'container'>
            <Action 
                hasOptions={this.state.options.length > 0}
                handlePickAction= {this.handlePickAction}
            />
            <div className="widget">
            <Options 
                options = {this.state.options}
                handleDeleteAllOptions = {this.handleDeleteAllOptions}
                handleDeleteOption = {this.handleDeleteOption}
            />
            <AddOption 
                handleAddOption = {this.handleAddOption}
            />
            </div>
            </div>
            <OptionModal selectedOption = {this.state.selectedOption}
            handleClearOptionSelection = {this.handleClearOptionSelection}/>
        </div>
        )
    }
}

IndecisionApp.defaultProps = {
    "options": []
}