
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import {   Button, Input } from 'semantic-ui-react'
// React component
class Counter extends Component {
  constructor() {
    super();
    this.readBook = this.readBook.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }
  readBook(){
    $.ajax({
  			   url:"http://localhost:8080/read/",
  			 type:'GET',
  			success: function(data)
  			{
          this.props.readBook(data.book)
          console.log(data.book)
        }.bind(this),
  			error: function(err)
  			{

  			}.bind(this)
  		});
  }
  saveBook(){
    console.log(JSON.stringify(this.props.toc));
    console.log(JSON.parse(JSON.stringify(this.props.toc)));
    $.ajax({
           url:"http://localhost:8080/save/",
         type:'POST',
         data:{book:JSON.stringify(this.props.toc)},
        success: function(data)
        {
        }.bind(this),
        error: function(err)
        {

        }.bind(this)
      });
  }
  render() {
    const { toc, addChapter,updateChapter,removeChapter,updateTopic,addTopic,removeTopic} = this.props
    console.log(this.props);
    const chapter=toc.map((value,index)=>{
            if(value["topic"]!=undefined)
            var Topic=value["topic"].map((topicValue,topicIndex)=>{
              return(<div><Input id={topicIndex} value={topicValue["name"]} onChange={updateTopic.bind(this,index)}/>
              <Button color= "orange" content="RemoveTopic" id={topicIndex} onClick={removeTopic.bind(this,index)}/></div>) });
              console.log(Topic);
      return (<div key={index}>
            <Input id={index} onChange={updateChapter} value={value["name"]}/>
            <Button color= "red" content="RemoveChapter" id={index} onClick={removeChapter}/>
            <Button color= "green" content="AddTopic" id={index} onClick={addTopic} /><br/>{(value["topic"]!=undefined)?Topic:""}</div>)})
    console.log(chapter);
    return (
      <div>
         {chapter}<br/>
        <Button color= "blue" onClick={addChapter} >Add Chapter</Button>
        <Button color= "blue" onClick={this.saveBook} >Save Book</Button>
        <Button color= "blue" onClick={this.readBook} >Read Book</Button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.any.isRequired,
  addChapter: PropTypes.func.isRequired,
  updateChapter:PropTypes.func.isRequired,
  removeChapter:PropTypes.func.isRequired,
  addTopic:PropTypes.func.isRequired,
  updateTopic:PropTypes.func.isRequired,
  removeTopic :PropTypes.func.isRequired,
  readBook:PropTypes.func.isRequired
}


// Reducer
function counter(state = { toc: [{name:""}] }, action) {
  var toc = state.toc
  switch (action.type) {
    case 'addChapter':
      return { toc: toc.concat({name:""}) }
    case 'updateChapter':
    { var toc=toc.slice();
      toc[action.id]["name"]=action.value;  return { toc:toc}}
    case 'removeChapter':
    { var toc=toc.slice();toc.splice(action.id,1);
      return { toc:toc}}
    case 'addTopic':{
      var toc=toc.slice();
      if(toc[action.chapter]["topic"]==undefined)
      toc[action.chapter]["topic"]=[];
      toc[action.chapter]["topic"].push({name:""})
      return { toc: toc }
    }
    case 'updateTopic':
    { var toc=toc.slice();
      toc[action.index]["topic"][action.id]["name"]=action.value;  return { toc:toc}}
    case 'removeTopic':
    { var toc=toc.slice();toc[action.index]["topic"].splice(action.id,1);
      return { toc:toc}}
    case 'readBook':
    {
      return {toc:action.toc}
    }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    toc: state.toc
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    addChapter: () => {
                              const addChapter = { type: 'addChapter' };
                              return dispatch(addChapter)
                            },
    updateChapter: (e,data) => {
                              const updateChapter={type:'updateChapter',value:data.value,id:data.id};
                              return dispatch(updateChapter)
                                },
    removeChapter: (e,data) => {
                              const removeChapter={type:'removeChapter',id:data.id};
                              return dispatch(removeChapter)
                            },
    addTopic: (e,data) => {
                              const addTopic = { type: 'addTopic',chapter:data.id };
                              return dispatch(addTopic)
                            },

    updateTopic: (index,e,data) => {
                                      const updateTopic={type:'updateTopic',value:data.value,id:data.id,index:index};
                                      return dispatch(updateTopic)
                                    },
    removeTopic: (index,e,data) => {
                                      console.log(e,data,index,Array.prototype.slice.call(arguments))
                                      const removeTopic={type:'removeTopic',id:data.id,index:index};
                                      return dispatch(removeTopic)
                                    },
    readBook:(toc)=>{
                    const readBook={toc:toc,type:"readBook"};
                      return dispatch(readBook)
                    }
                              }
}


// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default class Book extends Component{
  render(){
    return (
      <Provider store={store}>
      <App />
      </Provider>

    )
  }
}
