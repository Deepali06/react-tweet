import Twitter from './Twitter.jsx';
import Book from './book.jsx';
import NavBar from './navbar.jsx';


//Export the component, so that by including the Folder, by default the component is exported
//ES5 export
//module.exports = Sample;

//ES6 export
module.exports =  {
  Twitter:Twitter,
  Book:Book,
  NavBar:NavBar
}
//If your functional module have multiple components and more than one of them have
// to be exported, follow the object notation to export them
/*module.exports =  {
	component1: component1,
	component2: component2,
	component3: component3,
	..
	..
	componentN: componentN,
}*/
