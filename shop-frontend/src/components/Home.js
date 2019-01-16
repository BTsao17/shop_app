import React from 'react' 

const Home = (props) => (
  <div className='container'>
  <div className='row'>
    <div className='col'>
      <h1 className='text-center'>Welcome to The Stationery Emporium</h1>
    </div>
  </div >
  <div className='row'>
    <div className='col'>
      <form className='text-center' onSubmit={
        props.updateName}>
        <h2>Please Enter Your Name</h2>
        <input type='text' name="name" />
        <input type='submit' value='Enter' />
      </form>
    </div>
  </div>
</div >
)

export default Home