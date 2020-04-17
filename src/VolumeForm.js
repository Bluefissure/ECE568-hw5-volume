import React from 'react';

class VolumeForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          units: 'English',
          results: [],
          resultsDom: null,
          shape: '',
          radius: 0,
          height: 0,
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleUnitsChange = this.handleUnitsChange.bind(this);
      this.handleShapeChange = this.handleShapeChange.bind(this);
      this.handleRadiusChange = this.handleRadiusChange.bind(this);
      this.handleHeightChange = this.handleHeightChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({units: event.target.value});
    }

    handleShapeChange(event) {
        this.setState({shape: event.target.value});
    }

    handleUnitsChange(event) {
        this.setState({units: event.target.value});
    }
    
    handleRadiusChange(event) {
        this.setState({radius: (event.target.value)});
    }
    
    handleHeightChange(event) {
        this.setState({height: (event.target.value)});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        let shape = this.state.shape;
        if (shape === '') {
            alert("You haven't select the shape!");
            return;
        }
        let radius = parseFloat(this.state.radius);
        let height = parseFloat(this.state.height);
        let units = this.state.units === "English"? "(ft)" :"(m)";
        let results = this.state.results;
        let volume = ((shape === "Sphere")
            ? 4 / 3 * Math.PI * Math.pow(this.state.radius, 3)
            : (shape === "Cone")
                ? 1 / 3 * Math.PI * Math.pow(this.state.radius, 2) * this.state.height
                : Math.PI * Math.pow(this.state.radius, 2) * this.state.height);
        volume = volume.toFixed(2);
        let result = [
            shape,
            radius + units,
            (shape === "Sphere"? "-":height + units),
            volume + units
        ]
        results.push(result);
        this.setState({results: results});
        console.log(result);
        let resultsList = results.map(
            l => (
                <tr>
                <th>{l[0]}</th>
                <th>{l[1]}</th>
                <th>{l[2]}</th>
                <th>{l[3]}</th>
                </tr>
            )
        )
        let resultsDom = (
            <center>
                <table border="1">
                    <tr>
                    <th>Shape</th>
                    <th>Radius</th>
                    <th>Height</th>
                    <th>Volume</th>
                    </tr>
                    {resultsList}
                </table>
            </center>
        )
        this.setState({ resultsDom: resultsDom })
    }
  
    render() {
        let parameter = null;
        if (this.state.shape === "Sphere") {
            parameter = <div>
                Enter the radius: <input value={this.state.radius} onChange={this.handleRadiusChange}/>
            </div>
        } else if (this.state.shape === "Cone" || this.state.shape === "Cylinder"){
            parameter = (<div>
                <div>
                    Enter the radius: <input value={this.state.radius} onChange={this.handleRadiusChange}/>
                </div>
                <div>
                    Enter the height: <input value={this.state.height} onChange={this.handleHeightChange}/>
                </div>
            </div>)
        }
        return (
            <div>
                <h1>Volume Calculator</h1>
                <h2>Input</h2>
                <form onSubmit={this.handleSubmit}>
                    Select the units (English or SI):
                    <div>
                        <input type="radio" value="English" checked={this.state.units === "English"}
                            onChange={this.handleUnitsChange}/>English
                        <input type="radio" value="SI" checked={this.state.units === "SI"}
                            onChange={this.handleUnitsChange}/>SI
                    </div>
                    Select the shape {" "}
                    <select value={this.state.shape} onChange={this.handleShapeChange}>
                        <option value="" hidden></option>
                        <option value="Cylinder">Cylinder</option>
                        <option value="Sphere">Sphere</option>
                        <option value="Cone">Cone</option>
                    </select>
                    {parameter}
                    <div>
                        <button className="submit">Submit</button>
                    </div>
                </form>
                <h2>Results</h2>
                <p>You selected to use {this.state.units} units.</p>
                <p>{(this.state.shape === '')
                    ? 'You haven\'t selected the shape.' 
                    : 'You selected to find the values for a ' + this.state.shape +' shape.'}
                </p>
                {this.state.resultsDom}
            </div>
        );
    }
  }

  export default VolumeForm;