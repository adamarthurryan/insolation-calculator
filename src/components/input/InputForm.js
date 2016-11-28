import React from 'react'

import {Form} from 'semantic-ui-react'

export default class InputForm extends React.Component {

  //returns an onChange handler for the given field
  changeHandler(field) {
    return (event) => field.onChange(event.target.value)
  }

  render() {
    return <Form > 
        {this.props.inputFields.map(field => 
          <Form.Field>
            <label>{field.name}<br/><span className='inputform-fieldinfo'>{field.info}</span></label>
            <input onChange={this.changeHandler(field)} value={field.value}/>  
          </Form.Field>
        )}
    </Form>
  }
}

/*
        <div key={field.id}>
            <label htmlFor={field.id}>{field.name}</label>
            <span className="inputform-fieldinfo u-cf">{field.info}</span>
            <input
              type="text" 
              id={field.id} 
              onChange={(event) => field.onChange(event.target.value)}
              value={field.value}></input>
          </div>
*/