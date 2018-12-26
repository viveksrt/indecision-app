console.log("App.js is running");

let app = {
    "title":"Indecision App",
    "subtitle":"Learning about React.js",
    "options":[]
};


const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        renderCounterApp();
    }
}

const removeAllOptions = () => {
    app.options = [];
};
let appRoot = document.getElementById('app');


const pickRandom = () => {
    const index = Math.floor(Math.random()* app.options.length);
    const option = app.options[index];
    alert(option);
}

const renderCounterApp = () => {
let template = (
    <div>
        <h1>{app.title}</h1> 
        {(app.subtitle && <p>{app.subtitle}</p>)}
        {(app.options && app.options.length>0 )? <p>Here are your options</p> :<p>There are no options to select</p> }
        <button disabled={app.options.length === 0} onClick={pickRandom}>What should I do?</button>
        <button onClick={removeAllOptions}>Remove all options</button>
       <ol>
        {app.options.map((x)=>{return <li key={x}>{x}</li>})}
        </ol>
        <form onSubmit={onFormSubmit}>
        <input type= "text" name="option"></input>
        <button>Add option</button>
        </form>
        </div>
    );

ReactDOM.render(template, appRoot);
}


renderCounterApp();












// let showDetails = false;

// const toggleFn = (e) => {
//     showDetails = !showDetails;

//     renderVisibilityApp();

// }

// const renderVisibilityApp = () => {
//     let template3 = (
//         <div>
//             <h1>Visibility Toggle</h1> 
//            <button id = "vis-btn" onClick={toggleFn}> {showDetails? "Hide Details!": "Show Details!"}</button>
//            {showDetails && <p>Showing some details</p>}
//             </div>
//         );
    
//     ReactDOM.render(template3, appRoot);
// }

// renderVisibilityApp();
