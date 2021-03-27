import React from 'react'
// import {Link} from 'react-router-dom';
import ModalWindow from '../ModalWindow';
const BlogCta = ({loading, handleDelete,handleEditShown, isOwn}) => {
  return (
    <div className = {isOwn? 'blogCta': 'd-none'} >
      <button
        type = 'button' 
        onClick = {handleEditShown}
        className = 'btn fas fa-edit text-secondary edit-btn  mr-3' >
      edit</button>
        <a href= "/"
          disabled = {loading}
          type= 'button'
          className = 'fas fa-trash text-secondary delete-btn'
          data-toggle="modal" data-target="#exampleModal"
          >
        </a>
        <ModalWindow 
          title='Deleting a blog' 
          body="Are You sure to delete your blog? It will be deleted constantly."
          handleAction = {handleDelete}
          confirmation = 'Delete'
        />        
    </div>
  )
}

export default BlogCta
