
class IndecisionApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            "options":props.options
        }
        this.handleDeleteAllOptions = this.handleDeleteAllOptions.bind(this);
        this.handlePickAction = this.handlePickAction.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
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

    handleDeleteAllOptions()  {
        this.setState(() => ({"options":[]}))
    }

    handleDeleteOption(option){
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

    handlePickAction() {
        const index = Math.floor(Math.random()* this.state.options.length);
        const option = this.state.options[index];
        alert(option);
    }

    handleAddOption(option) {
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
            <Action 
                hasOptions={this.state.options.length > 0}
                handlePickAction= {this.handlePickAction}
            />
            <Options 
                options = {this.state.options}
                handleDeleteAllOptions = {this.handleDeleteAllOptions}
                handleDeleteOption = {this.handleDeleteOption}
            />
            <AddOption 
                handleAddOption = {this.handleAddOption}
            />
        </div>
        )
    }
}

IndecisionApp.defaultProps = {
    "options": []
}

const Header = (props) => {
    return (
        <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    "title" : "Indecision"
}

const Action = (props) => {
    return (
        <button onClick={props.handlePickAction} 
        disabled = {!props.hasOptions}>What should I do?</button>
    )
}

const Option = (props) => {
    return (
        <div>
        {props.optionText}
        <button 
        onClick= { (e) => {
            props.handleDeleteOption(props.optionText)
        }}>Remove</button>
        </div>
    )
}


const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteAllOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {props.options.map((option)=> (
                <Option 
                handleDeleteOption = {props.handleDeleteOption} 
                key = {option} 
                optionText={option}/>
            ))}
        </div>
        )
}

class AddOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "error": undefined
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
       
    }

    onFormSubmit(e)  {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        if (!error) {
            e.target.elements.option.value = '';
        } 
         this.setState(()=>({error}))
    }
    render () {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onFormSubmit}>
                <input type= "text" name="option"></input>
                <button>Add option</button>
            </form>
            </div>
            )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));

