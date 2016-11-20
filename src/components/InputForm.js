import React from 'react'



export default class InputForm extends React.Component {
  render() {
    return <form>
      {this.props.inputFields.map(field => 
          <div>
            <label htmlFor={field.id}>{field.name}</label>
            <span className="inputform-fieldinfo u-cf">{field.info}</span>
            <input
              type="text" 
              id={field.id} 
              onChange={(event) => field.onChange(event.target.value)}
              value={field.value}></input>
          </div>
      )}
    </form>
  }
}

